let gc = new gameslib.GameConnection();

document.getElementById('send').onclick = sendScoreClick;
document.getElementById('end').onclick = endGameClick;

function sendScoreClick(){
    let score = document.getElementById('score').value;
    gc.sendScore(score);
}

function endGameClick(){
    let score = document.getElementById('score').value;
    gc.sendScore(score, true);
}