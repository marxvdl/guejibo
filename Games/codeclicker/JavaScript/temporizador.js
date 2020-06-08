var tempolimitado = true;
//Se o modo tempo limitado for selecionado, o jogo acaba em 25 minutos
if (tempolimitado) {
    setTimeout(function () {
        clearInterval(iniciar);
        gc.sendScore(pontuacaoAcumulada, true);
    }, 15000);
}

gc.onEndGame(function () {
    alert('O jogo acabou!\nPontuação final: ' + pontuacaoAcumulada + '\nNúmero de clicks: ' + quantidadeClicks + '\nRespostas corretas: ' + acertou);
});