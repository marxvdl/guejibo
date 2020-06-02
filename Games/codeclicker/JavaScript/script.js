var pontuacao=0;
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
  });
pontuacaoAcumulada=0;
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
	$('#pontuacao').text('Pontuação: '+pontuacao);
	quantidadeClicks++;
	escreverCodigo();
});
//Escreve algum codigo na tela baseado na pontuacao total
function escreverCodigo() {
	if(codigo[qualCodigo].length>pontuacaoAcumulada){
		$(".java").text(codigo[qualCodigo].slice(0,pontuacaoAcumulada));
	}
	else{
		pontuacaoAcumulada=0;
		if(qualCodigo===0){
			qualCodigo=1;
		}
		else{
			qualCodigo=0;
		}
		$(".java").text(codigo[qualCodigo].slice(0,pontuacaoAcumulada));
	}
	hljs.initHighlighting.called = false;
	hljs.initHighlighting();
	if(upgradeClickComprado){
		if(pontuacaoAcumulada>=Math.pow(10,upgradeClick)*1000){
			upgradeClickComprado=false;
			$('#upgrade').append('<img src="PixelArts/button_teclado_frame_zero.gif" alt="melhorar clicque" data-toggle="tooltip" title="Aumentar valor do clique em 100%. Custo: '+(Math.pow(10,upgradeClick)*500)+' "data-placement="left"class="imgUpgradeClique" id='+upgradeClick+'>');
			upgradeClick++;
		}
	}
}
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
			$('#pontuacao').text('Pontuação: '+pontuacao);

			escreverCodigo();
	}


