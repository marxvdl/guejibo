//Estes arrays guardam as informações dos itens
var preco=[15,100,1100,12000,130000,1400000];
var quantidade=[0,0,0,0,0,0];
var upgrade=[1,1,1,1,1,1];
var quantidadeUpgrade=[0,0,0,0,0,0];
var quantoProduz=[0,0,0,0,0,0];
var producao=[0.1,1,8,47,260,1400];
var qualItem;
var itens=['Ia','Programador','Karem','StartUp','Alien','Wanghley'];
var upgradeComprado=[true,true,true,true,true,true];
$('#comprarIa').on('click', function(){
	qualItem=0;
	comprar();
});
$('#comprarProgramador').on('click', function(){
	qualItem=1;
	comprar();
});
$('#comprarKarem').on('click', function(){
	qualItem=2;
	comprar();
});
$('#comprarStartUp').on('click', function(){
	qualItem=3;
	comprar();
});
$('#comprarAlien').on('click', function(){
	qualItem=4;
	comprar();
});
$('#comprarWanghley').on('click', function(){
	qualItem=5;
	comprar();
});
//Função responsável pela compra de itens
function comprar(){
	if(pontuacao>=preco[qualItem]){
		preco[qualItem]=Math.floor(preco[qualItem]*1.13);
		quantidade[qualItem]++;
		pontuacao-=preco[qualItem];
		if(ps===0.0){
			gerarPontos();
		}
		quantoProduz[qualItem]+=producao[qualItem]*upgrade[qualItem];
		ps+=producao[qualItem]*upgrade[qualItem];
		
		$('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		//este switch contem as linhas de código específicos de cada item
		switch(qualItem){
			case 0:
				var imgIa = $('<img class="itemImg">');
				imgIa.attr('src','PixelArts/BAS_IA.gif');
				imgIa.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_IA.gif" alt="melhorar Ia" data-toggle="tooltip" title="Aumentar Produção das Ias e clique em 100%. Custo: '+100*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeIa" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeIas').text('Quantidade de Ias: '+quantidade[qualItem]);
				$('#custoIa').text('Custo Ia: '+preco[qualItem]);
				break;
			case 1:
				var imgProgramador = $('<img class="itemImg">');
				imgProgramador.attr('src','PixelArts/BAS_Programador.gif');
				imgProgramador.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_Programador.gif" alt="melhorar programador" data-toggle="tooltip" title="Aumentar Produção dos programadores em 100%. Custo: '+1000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeProgramador" id='+quantidadeUpgrade[qualItem]+'>');}
				}
				$('#quantidadeProgramadores').text('Quantidade de Programadores: '+quantidade[qualItem]);
				$('#custoProgramadores').text('Custo Programador: '+preco[qualItem]);
				break;
			case 2:
				var imgKarem = $('<img class="itemImg">');
				imgKarem.attr('src','PixelArts/BAS_Karen.gif');
				imgKarem.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_Karen.gif" alt="melhorar Robotrom" data-toggle="tooltip" title="Aumentar Produção dos Robotrons em 100%. Custo: '+11000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeKarem" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeKarens').text('Quantidade de Robotrons: '+quantidade[qualItem]);
				$('#custoKarem').text('Custo Robotrom: '+preco[qualItem]);
				break;
			case 3:
				var imgStartUp = $('<img class="itemImg">');
				imgStartUp.attr('src','PixelArts/Startup.gif');
				imgStartUp.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/Startup.gif" alt="melhorar StartUp" data-toggle="tooltip" title="Aumentar Produção das StartUps em 100%. Custo: '+120000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeStartUp" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeStartUps').text('Quantidade de StartUps: '+quantidade[qualItem]);
				$('#custoStartUp').text('Custo StartUp: '+preco[qualItem]);
				break;
			case 4:
				var imgAlien = $('<img class="itemImg">');
				imgAlien.attr('src','PixelArts/BAS_Alien.gif');
				imgAlien.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_Alien.gif" alt="melhorar Alienígena" data-toggle="tooltip" title="Aumentar Produção dos Alienígenas em 100%. Custo: '+1300000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeAlien" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeAliens').text('Quantidade de Alienígenas: '+quantidade[qualItem]);
				$('#custoAlien').text('Custo Alienígena: '+preco[qualItem]);
				break;
			case 5:
				var imgWanghley = $('<img class="itemImg">');
				imgWanghley.attr('src','PixelArts/BAS_deus da programação.png');
				imgWanghley.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_deus da programação.png" alt="melhorar Deus da Programação" data-toggle="tooltip" title="Aumentar Produção dos Deuses da Programação em 100%. Custo: '+14000000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeWanghley" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeWanghley').text('Quantidade de Deuses da Programação: '+quantidade[qualItem]);
				$('#custoWanghley').text('Custo Deus da Programação: '+preco[qualItem]);
				break;
		}
	}
};
