var id;
var qualUpgrade;
$(document).on('click','.imgUpgradeIa', function(){
	qualUpgrade=0
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeProgramador', function(){
	qualUpgrade=1
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeKarem', function(){
	qualUpgrade=2
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeStartUp', function(){
	qualUpgrade=3
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeAlien', function(){
	qualUpgrade=4
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeWanghley', function(){
	qualUpgrade=5
	 id = $(this).attr('id');
	 fUpgrade();
});
var custoUpgrade= [100,1000,11000,120000,1300000,14000000];
//função para melhorar os itens
function fUpgrade(){
	if(pontuacao>=(custoUpgrade[qualUpgrade]*Math.pow(5,(id-1)))){
		upgradeComprado[qualUpgrade]=true;
		pontuacao-=custoUpgrade[qualUpgrade]*Math.pow(5,(id-1));
		upgrade[qualUpgrade]=upgrade[qualUpgrade]*2;
		ps-=quantoProduz[qualUpgrade];
		quantoProduz[qualUpgrade]=quantoProduz[qualUpgrade]*2;
		ps+=quantoProduz[qualUpgrade];
		$('.imgUpgrade'+itens[qualUpgrade]+'#'+id).remove();
		$('#pontuacao').text(pontuacao);
		$('#comprar'+itens[qualUpgrade]).prop('title','produção por segundo='+(producao[qualUpgrade]*upgrade[qualUpgrade]));
		$('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		if(qualUpgrade===0){
			valorclick=valorclick*2;
			$('#ppc').text('Pontos por clique: '+valorclick);
		}
	}
};
//Upgrades especiais
$('#sacrificioP').on('click', function(){
	if(pontuacao>=2000000){
		$('#sacrificioP').remove();
		quantidade[1]-=5;
		quantoProduz[1]-=5*upgrade[1];
		ps-=5*upgrade[1];
		ps-=quantoProduz[4];
		upgrade[4]=upgrade[4]*4;
		quantoProduz[4]=quantoProduz[4]*4;
		ps+=quantoProduz[4];
		
	}

});