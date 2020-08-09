let gc = new gameslib.GameConnection();

// TODA VEZ QUE A JANELA FOR REDIMENSIONADA, O ESPAÇO ADQUIRE 100% DO SEU HEIGHT E DO SEU WIDTH
$('#espaco').css('width', `${window.innerWidth}px`);
$('#espaco').css('height', `${window.innerHeight}px`);
window.addEventListener('resize', function() {
	$('#espaco').css('width', `${window.innerWidth}px`);
	$('#espaco').css('height', `${window.innerHeight}px`);
});
// ***

// TODA VEZ QUE O SCROLL FOR CHAMADO, ELE VOLTA PARA ZERO, IMPEDINDO-O DE ACONTECER
function bloqueia_scroll(){
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
}
$(window).bind('scroll', bloqueia_scroll);
// ***

// VARIÁVEIS DE CONFIGURAÇÃO
let salto_nave=0.30;
let salto_laser=3;
let salto_obs=0.075;
let tempo_atualizacao=1;
// ***

// VARIÁVEIS DE CONTROLE
let acoes_nave={
	'moveu_direita':false,
	'moveu_esquerda':false,
	'atirou':false
};
let parar=false;
let pontuacao=0;
let tempo=2*60;
// ***

// CHAMADAS DE FUNÇÕES
$('#btn_jogar').click(function(){
	$('#bg_inicio').hide();
	tempo=Math.floor(parseFloat($('#tempo_desejado').val()))*60;
	$('#tempo').text(escreve_tempo(tempo));
	posiciona_laser();
	atualiza();
	temporizador();
});
$('#numero_objetivo').text(aleatorio(0, 256));
// ***

function game_over(){
	parar=true;
	gc.sendScore(pontuacao);
	$('#pontuacao_obtida').text(pontuacao);
	$('#bg_fim').show();
}

$('#btn_jogar_novamente').click(() => {
	window.location.reload();
});

// *************************************************
// LOOP PRINCIPAL
// *************************************************
function atualiza(){
	verifica_acoes_nave();
	gera_obstaculos(6);
	move_obstaculos();
	limite_espaco_nave();
	limite_espaco_obstaculos();
	verifica_resposta();
	let intervalo_func=setTimeout(atualiza,tempo_atualizacao);
	if (parar){
		clearTimeout(intervalo_func);
	}
	$('#pontuacao').text(pontuacao);
}
// *************************************************

function verifica_resposta(){
	let resposta='';
	let alts=$('.alt');
	for(let i=0; i<alts.length; i++){
		resposta+=$(alts[i]).children('.valor').text();
	}
	resposta=parseInt(resposta, 2);
	let valor=parseInt(resposta);
	$('#numero_atual').text(valor);
	let objetivo=parseInt($('#numero_objetivo').text());
	if(valor==objetivo){
		toast('Parabéns, você acertou! +10 pontos!', 'purple', 2500);
		pontuacao+=10;
		gc.sendScore(pontuacao);
		$('#numero_objetivo').text(aleatorio(0, 255));
	}
}

function aleatorio(min, max) {
	// Gera um número aleatório entre o mínimo e o máximo, estando eles inclusos
	 min = Math.ceil(min);
	 max = Math.floor(max);
	 return Math.floor(Math.random()*(max-min+1))+min;
}

function gera_obstaculos(qtde){
	function define_tipos(t, obj){
		switch(t){
			case 1:
			case 2:
			case 3:
				$(obj).addClass('amigo').css('background-image', 'url("img/planeta_generico.gif")');
				break;
			case 4:
			case 5:
				$(obj).addClass('amigo').css('background-image', 'url("img/planeta_roxo.gif")');
				break;
			case 6:
				$(obj).addClass('amigo').css('background-image', 'url("img/sol.gif")');
				break;
			case 7:
			case 8:
			case 9:
			case 10:
				$(obj).addClass('inimigo').css('background-image', 'url("img/alien.gif")');
				break;
		}
		return obj;
	}
	let width_obs = $('#obstaculos').width();
	let height_obs = $('#obstaculos').height();
	if($('#obstaculos').children().length==0){
		// TIPO A: VEM DA ESQUERDA
		for(let i=0; i<qtde; i++){
			let x=aleatorio(0, width_obs);
			let y=aleatorio(90, height_obs-100);
			let _obstaculo = $('<div class="obs obs_a"></div>').css('bottom', `${y}px`).css('left', `${x}px`);
			let tipo=aleatorio(1, 10);
			_obstaculo=define_tipos(tipo, _obstaculo);
			$('#obstaculos').append(_obstaculo);
		}
		// TIPO B: VEM DA DIREITA
		for(let i=0; i<qtde; i++){
			let x=aleatorio(0, width_obs);
			let y=aleatorio(90, height_obs-100);
			let _obstaculo = $('<div class="obs obs_b"></div>').css('bottom', `${y}px`).css('left', `${x}px`);
			let tipo=aleatorio(1, 10);
			_obstaculo=define_tipos(tipo, _obstaculo);
			$('#obstaculos').append(_obstaculo);
			$('#obstaculos').append(_obstaculo);
		}

	}
}

function move_obstaculos(){
	$('.obs_a').css('left', `-=${salto_obs}%`);
	$('.obs_b').css('left', `+=${salto_obs}%`);		
}

function limite_espaco_obstaculos(){
	let left_espaco = $('#espaco').offset().left;
	let width_espaco = $('#espaco').width();
	let _obstaculos = $('.obs');
	for(let i=0; i<_obstaculos.length; i++){
		let left_obs = $(_obstaculos[i]).offset().left;
		let width_obs = $(_obstaculos[i]).width();
		if(left_obs<width_obs||left_obs>width_espaco-width_obs){
			$(_obstaculos[i]).remove();
		}
	}
}

function verifica_acoes_nave(){
	// AÇÕES DA NAVE
	let c=0;
	if(acoes_nave['moveu_direita']){
		$('#nave').css('background-image', `url('img/nave_direita.png')`);
		$('#nave').css('left', `+=${salto_nave}%`);
	}
	if(acoes_nave['moveu_esquerda']){
		$('#nave').css('background-image', `url('img/nave_esquerda.png')`);
		$('#nave').css('left', `-=${salto_nave}%`);
	}
	if(!acoes_nave['moveu_direita']&&!acoes_nave['moveu_esquerda']){
		$('#nave').css('background-image', `url('img/nave.png')`);
	}
	if(acoes_nave['atirou']){
		if (acoes_nave['atirou']){
			acoes_nave['atirou']=false;
			atira();
			clicou_nave=false;
		}
	}else{
		// Dado que a nave não atirou, isso significa que o laser deve estar dentro dela. Portanto, deve ser posicionado.
		posiciona_laser();
	}
	// ***
}

function limite_espaco_nave() {
	// Esta função serve para evitar a nave de sair do espaço delimitado. Quando ele atinge o limite à direta, por exemplo, ela surge no início da esquerda.
	let top_espaco = $('#espaco').offset().top;
	let left_espaco = $('#espaco').offset().left;
	let height_espaco = $('#espaco').height();
	let width_espaco = $('#espaco').width();
	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left;
	let height_nave = $('#nave').height();
	let width_nave = $('#nave').width();
	// direita
	if (left_nave > width_espaco - width_nave) {
		$('#nave').css('left', `${0}px`);
	}
	// esquerda
	if (left_nave < left_espaco) {
		$('#nave').css('left', `${width_espaco - width_nave - 5}px`);
	}

	// TODA VEZ QUE A NAVE E O BLOCO DE INFORMAÇÕES SE ENCONTRAM, O BLOCO MUDA DE LUGAR
	let left_informacoes = $('#informacoes').offset().left;
	let width_informacoes = $('#informacoes').width();
	if(left_nave>=left_informacoes-width_nave){
		$('#informacoes').css('left', '3%');
	}
	if(left_nave<width_informacoes+50){
		$('#informacoes').css('left', '80%');
	}
}

// CENTRO DE AÇÕES
$('body').keydown(function(event) {
	let tecla = event.keyCode;
	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita']=true;
	}
	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda']=true;
	}
	if (tecla == 32) {
		// espaço
		// tiros_dados++;
		acoes_nave['atirou']=true;
	}
});
$('body').keyup(function(event) {
	let tecla = event.keyCode;
	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita']=false;
	}
	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda']=false;
	}
	if (tecla == 32) {
		// espaço
		// tiros_dados++;
		acoes_nave['atirou']=false;
	}
});
// ***

// CONTROLE DA NAVE VIA CLIQUE
let clicou_nave=false;
$('#nave').click(function(){
	clicou_nave=true;
	acoes_nave['atirou']=true;
});
let mouse;
window.addEventListener('mousemove', function(e){
	let x = {
	    'x_page': e.pageX,
	    'y_page': e.pageY,
	    'x_client': e.clientX,
	    'y_client': e.clientY
	};
    mouse = x;
});
$('#espaco').click(function(e){
	if(!clicou_nave && !parar){
		$('#nave').animate({
			'left':`${mouse['x_client']}px`
		}, 1000);
		clicou_nave=false;
	}
});
// ***

// FUNÇÃO DE TIRO
function atira(){
	$('#laser').show();
	$('#laser').css('margin-top', `-=${salto_laser}%`);

	// VERIFICA COLISÃO DO LASER COM OBSTÁCULOS
	let colidiu_obs=verifica_colisao('#laser', '.obs');
	if(colidiu_obs[0]){
		if($(colidiu_obs[1]).hasClass('inimigo')){
			pontuacao++;
			gc.sendScore(pontuacao);
			toast('+1 ponto!', 'green');
		}else{
			pontuacao--;
			gc.sendScore(pontuacao);
			toast('-1 ponto!', 'brown');
		}
		$(colidiu_obs[1]).remove();
	}
	// VERIFICA COLISÃO DO LASER COM ALTERNATIVAS
	let colidiu_alt=verifica_colisao('#laser', '.alt');
	if(!colidiu_obs[0]){
		if(colidiu_alt[0]){
			if($(colidiu_alt[1]).children('.valor').text()=='1'){
				$(colidiu_alt[1]).css('background-image', 'url("img/zero.gif")');
				$(colidiu_alt[1]).children('.valor').text('0');
			}else if($(colidiu_alt[1]).children('.valor').text()=='0'){
				$(colidiu_alt[1]).css('background-image', 'url("img/um.gif")');
				$(colidiu_alt[1]).children('.valor').text('1');
			}
		}
	}

	let tiro = window.requestAnimationFrame(atira);
	if ($('#laser').offset().top <= 0) {
		window.cancelAnimationFrame(tiro);
		$('#laser').css('margin-top', '0px');
		$('#laser').hide();
	}
}

// DADO QUE O LASER É SEPARADO DO INTERIOR DA NAVE, NO HTML, É PRECISO POSICIONÁ-LO
function posiciona_laser(){
	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left + 5;
	$('#laser').css('top', `${top_nave}px`);
	$('#laser').css('left', `${left_nave}px`);
}

function verifica_colisao(e1, e2){
	// DIMENSÕES E POSIÇÃO DO ELEMENTO 1
	let top_e1 = $(e1).offset().top;
	let left_e1 = $(e1).offset().left;
	let height_e1 = $(e1).height();
	let width_e1 = $(e1).width();
	// DIMENSÕES E POSIÇÃO DO ELEMENTO 2
	let _e2 = $(e2);
	for(let i=0; i<_e2.length; i++){
		let top_e2 = $(_e2[i]).offset().top;
		let left_e2 = $(_e2[i]).offset().left;
		let height_e2 = $(_e2[i]).height();
		let width_e2 = $(_e2[i]).width();
		// VERIFICAÇÃO
		if(left_e1>=left_e2){
			if(left_e1<left_e2+width_e2){
				if(top_e1<top_e2+height_e2){
					$('#laser').css('margin-top', '0px');
					$('#laser').hide();
					return [true, _e2[i]];										
				}
			}
		}
	}
	return false;
}

// TOAST
function toast(texto, bg, tempo=1100) {
	$('#toast').css('background', bg);
	$('#toast').text(texto);
	$('#toast').fadeIn('300');
	setTimeout(function() {
		$('#toast').fadeOut('1000');
	}, tempo);
}
// ***

// TEMPORIZADOR
function temporizador() {
    if(parar){
    	clearTimeout(t);
    }
	let t = setTimeout(function() {
	  	if(tempo > 0){
	  		$('#tempo').text(escreve_tempo(tempo--));
	  	}else{
	  		$('#tempo').text(escreve_tempo(tempo--));
	  		game_over();
	  	}
	    if(tempo >= 0) {
	      temporizador();
	    }
  	}, 1000);
}

function escreve_tempo(tempo) {
	let min = tempo / 60;
	if (min >= 1) {
		min = Math.floor(min);
	} else {
		min = 0;
	}
	let seg = tempo - (min * 60);
	if (seg < 10) {
		seg = '0' + seg;
	}
	return `${min}:${seg}`;
}
// ***