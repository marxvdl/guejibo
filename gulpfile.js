const { src, dest, parallel, series } = require('gulp');
const filter = require('gulp-filter');
const replace = require('gulp-replace');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const fs = require('fs');
var del = require('del');

function mkdirDist() {
  if (!fs.existsSync('dist'))
    fs.mkdirSync('dist');
}

/*
 * Builds the Angular client.
 */
function client(cb) {
  mkdirDist();

  const args =
    [
      '--prod',
      '--outputPath=../dist/client'
    ];

  exec(
    'ng build ' + args.join(' '),

    { cwd: 'Client' },

    (err, stdout, stderr) => {
      console.log('stdout ' + stdout);
      if (!/^\s*$/.test(stderr)) {
        console.log('stderr {' + stderr + '}');
      }
      cb(err);
    }
  );
}

/*
 * Deploys the backend code.
 */
function server(cb) {
  mkdirDist();

  src('Server/**/*')
    .pipe(dest('dist/'));

  const envContents =
    'NODE_ENV=production\n' +
    'JWT_SECRET=' + createRandomKey();
  fs.writeFile('dist/.env', envContents, cb);

  //
  function createRandomKey() {
    let result = new Array(120);
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz' +
      '"\'!@#$%*()_-+=`{[^~}]<,>.:;?/\\|' +
      '0123456789';
    for (let i = 0; i < 120; i++) {
      result[i] = characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result.join('');
  }
}

/*
 * Deploys the games.
 */
function games(cb) {
  mkdirDist();

  if (!fs.existsSync('dist/games'))
    fs.mkdirSync('dist/games');

  const indexHtml = filter('Games/*/index.html', { restore: true });
  src('Games/**/*')
    .pipe(indexHtml)
    .pipe(
      replace(
        '"\.\.\/\.\.\/GamesLib\/dist\/gameslib\.js"',
        '"../gameslib.min.js"'
      )
    )
    .pipe(indexHtml.restore)
    .pipe(dest('dist/games'));

  cb();
}

/*
 * Deploys the GamesLib library that games use to communicate with the backend.
 */
function gameslib(cb) {
  execSync(
    'npm run build',
    {
      cwd: 'GamesLib',
      stdio: 'inherit'
    }
  );
  src('GamesLib/dist/gameslib.min.js')
    .pipe(
      replace(
        'ws://localhost:8080/',
        'ws://localhost:3000/'
      )
    )
    .pipe(dest('dist/games'));
  cb();
}

/*
 * Commits the dist directory and pushes it to the Heroku server.
 */
function deploy(cb) {
  const opt = {
    cwd: 'dist',
    stdio: 'inherit'
  };

  const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  execSync( 'git add -A', opt );
  execSync( `git commit -m"Deploy ${now}"`, opt);
  execSync( 'git push heroku master', opt );
  
  cb();
}

/*
 * Removes the dist directory
 */
function clean(cb) {
  del('dist');
  cb();
}

//
exports.client = client;
exports.server = server;
exports.games = games;
exports.gameslib = gameslib;
exports.deploy = deploy;
exports.clean = clean;
exports.default = parallel(client, series(server, games, gameslib));
exports['build-deploy'] = series(exports.default, deploy);