let gc = new gameslib.GameConnection();

$('#send').click(sendScoreClick);
$('#end').click(endGameClick);
$('#completereg').click(completeRegistration);
gc.onEndGame(showGameOverBox);


function sendScoreClick(){
    let score = $('#score').val();
    gc.sendScore(score);
}

function endGameClick(){
    let score = $('#score').val();
    gc.sendScore(score, true);
}

function showGameOverBox(data){
    console.log(data);
    $('#name').text(data.user.name);
    $('#finalscore').text(data.score);
    $('#gameoverbox').fadeIn();   
}

function completeRegistration(){
    gc.loadJoinPage();    
}