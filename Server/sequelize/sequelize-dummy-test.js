const models = require('./models');
const Game = models.Game;
const User = models.User;
const GameRoom = models.GameRoom;

// User.bulkCreate(
//     [
//         {
//             name: "Fulanovsky de Tal",
//             email: "fulano@vsky.tal",
//             password: "234"
//         },
//         {
//             name: "Sicrano da Silva",
//             email: "sicrano@talala.com",
//             password: "qqq"
//         },
//         {
//             name: "Beltrano de Coisa",
//             email: "beltrano@zzz.org",
//             password: "asdfg"
//         }
//     ]
// )
// .then((user) => {
//     // console.log(user.get());
// })
// .catch((err) => {
//     console.log(`Erro criando usuário: ${err}`);
// });

// Game.bulkCreate([
//     {
//         name: "Dummy Game"
//     },
//     {
//         name: "Funny Game"
//     },
//     {
//         name: "Bunny Game"
//     }
// ])
// .then((game) => {
//     // console.log(game.get());
// })
// .catch((err) => {
//     console.log(`Erro criando game: ${err}`);
// });

// let now = Date.now();
// let after = new Date();
// after.setHours(after.getHours() + 1);
// GameRoom.bulkCreate([
//     {
//         gameId: 1,
//         ownerId: 1,
//         timeStarted: now,
//         timeEnded: after
//     },
//     {
//         gameId: 2,
//         ownerId: 1,
//         timeStarted: now,
//         timeEnded: after
//     },
//     {
//         gameId: 3,
//         ownerId: 3,
//         timeStarted: now,
//         timeEnded: after
//     }
// ])
// .then((gr) => {
//     // console.log(gr.get());
// })
// .catch((err) => {
//     console.log(`Erro criando game room: ${err}`);
// });


User.findOne({
    where: {email: 'fulano@vsky.tal'},
    include: ['ownedGameRooms', 'gameRooms']
})
.then( (fulano) => {
    fulano.name = "Fulanão de Tal";   

    GameRoom.findOne({ where: { id: 3 } })
    .then( (gr3 => {
        fulano.setGameRooms( [ gr3 ]);
        fulano.save();
    }));
});

User.findOne({
    where: {email: 'sicrano@talala.com'},
    include: ['ownedGameRooms', 'gameRooms']
})
.then( (sicrano) => {
    GameRoom.findAll()
    .then( (grAll => {
        sicrano.setGameRooms(grAll);
        sicrano.save();
    }));
});


/* *********************************************************** */

User.findOne({
    where: {email: 'sicrano@talala.com'},
    include: ['ownedGameRooms', 'gameRooms']
})
.then((user) => {
    console.log();
    console.log(user.get().name);
    console.log(user.get().email);
    console.log();

    console.log("Game rooms that sicrano@talala.com owns:");
    console.log( user.get().ownedGameRooms.map(gr => GameRoom.exportObject(gr) ) );
    console.log();

    console.log("Game rooms that sicrano@talala.com is part of:");
    console.log( user.get().gameRooms.map(gr => GameRoom.exportObject(gr) ) );
    console.log();
});


GameRoom.findOne(
    {
        where: { id: 4 },
        include: ['owner', 'users']
    }
)
.then( (gr) => {
    console.log("Owner of game room 4:");
    console.log( User.exportObject(gr.get().owner) );
    console.log(

    );
    console.log("Users of game room 4:");
    console.log( gr.get().users.map(u => User.exportObject(u)) );
    console.log();
});

Game.findOne(
    { where: { id: 2 } }
)
.then( (game) => {
    console.log();
    console.log("Game 2:");
    console.log( Game.exportObject(game) );
});