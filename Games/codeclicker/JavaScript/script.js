var pontuacao=0;
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
  });
pontuacaoAcumulada=0;
gc.sendScore(pontuacaoAcumulada);
var ps=0.0;
var qualCodigo=0;
var boost=1;
var valorclick=1;
var upgradeClick=1;
var quantidadeClicks=0;
var upgradeClickComprado=true; 
//Adiciona pontos ao clicar na imagem do computador
$('#Pczinho').on('click', function() {
	pontuacao=pontuacao+(valorclick*boost);
	pontuacaoAcumulada=pontuacaoAcumulada+(valorclick*boost);
	gc.sendScore(pontuacaoAcumulada);
	$('#pontuacao').text('Pontuação: '+pontuacao);
	quantidadeClicks++;
	escreverCodigo();
});

//Upgrade do click
$(document).on('click','.imgUpgradeClique', function(){
	var idClick=$(this).attr('id');
	if(pontuacao>=(Math.pow(10,idClick)*500)){
		pontuacao-=Math.pow(10,idClick)*500;
		$('.imgUpgradeClique#'+idClick).remove();
		valorclick=valorclick*2;
		upgradeClickComprado=true;
		$('#ppc').text('Pontos por clique: '+valorclick);
		$('#pontuacao').text(pontuacao);
	}
});


var iniciar;
	var psMaior20=false;
	//Funcao responsagel pela geracao de pontos
	function gerarPontos(){

		if(ps<20){
			pontuacao=pontuacao+(1*boost);
			pontuacaoAcumulada=pontuacaoAcumulada+(boost*1);
			gc.sendScore(pontuacaoAcumulada);
			$('#pontuacao').text('Pontuação: '+pontuacao);
			escreverCodigo();
			clearInterval(iniciar);
    		iniciar=setInterval(gerarPontos,(1000/ps));
		}
		else{
			
				clearInterval(iniciar);
				iniciar=setInterval(gerarPontos20,(50));
				psMaior20=true;
			
		}
	}
	//Variação da função acima para quando a pontuação poer segundo chegar a 20
	function gerarPontos20(){
		pontuacao=pontuacao+Math.round((ps*boost)/20);
			pontuacaoAcumulada=pontuacaoAcumulada+Math.round((ps*boost)/20);
			gc.sendScore(pontuacaoAcumulada);
			$('#pontuacao').text('Pontuação: '+pontuacao);

			escreverCodigo();
	}


