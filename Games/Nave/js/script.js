let passo_nave = 25;
let passo_obstaculos = 1;
let velocidade_obstaculos = 17; // menos é mais
let qtde_inicial_obstaculos = 7;

let vel_recarga_laser = 1;
let passo_laser = 95;
let pode_atirar = true;
let limite_tiro = 5;

let valor_retorno = 5;
let repelencia = 100;
let parcela_correcao = 5;

let min_top_aleatorio = 400;
let max_top_aleatorio = 600;

let obst_fim = 0;
let obst_dest = 0;

let tiros_dados = 0;
let tiros_errados = 0;

let quebra = false;

let qtde_movimento = 20;

let qtde_maxima_obstaculos = 25;

function aleatorio(min, max) {

	// Gera um número aleatório entre o mínimo e o máximo, estando eles inclusos

	 min = Math.ceil(min);
	 max = Math.floor(max);

	 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cria_obstaculos(quantidade) {

	// Esta função cria os obstáculos do jogo. Todos eles são gerados em posições aleatórias. O top é definido negativamente, para que eles levem um tempo para chegar ao usuário.

	for (let i = 0; i < quantidade; i++) {

		let $obstaculo = $(`<div class="bloco obstaculo"></div>`);
		$($obstaculo).css('position', 'absolute');

		let top = aleatorio(min_top_aleatorio, max_top_aleatorio);
		let left = aleatorio(0, $('#espaco_obstaculos').width() - 50);

		let r = aleatorio(0, 1);

		if (r == 0) {
			$($obstaculo).css('border-radius', '50%');
			$($obstaculo).css('background-image', `linear-gradient(#${aleatorio(100, 999)}, #${aleatorio(100, 999)})`);
		} else {
			$($obstaculo).css('width', '100px');
			$($obstaculo).css('height', '100px');
			$($obstaculo).css('border-radius', '50%');
			$($obstaculo).css('background-image', `linear-gradient(#${aleatorio(100, 999)}, #${aleatorio(100, 999)})`);
		}

		$($obstaculo).css('top', `${top}px`);
		$($obstaculo).css('left', `${left}px`);
		$('#espaco_obstaculos').append($obstaculo);

	}

}

function move_obstaculos () {

	// Esta função simplesmente incrementa o top cada um dos obstáculos. Ela fica dentro de um intervalo, que está logo abaixo.

	if ($('#espaco_obstaculos').offset().top < 1250) {
		$('#espaco_obstaculos').css('top', `+=${passo_obstaculos}`);
	}

	for (let i = 0; i < $('.obstaculo').length; i++) {

		// É preciso chamar a função que detecta a colisão para os obstáculos também
		detecta_colisao($('.obstaculo').eq(i));

		// Se o obstáculo chegou ao fim do espaço, ele fica escondido e recebe uma classe de chegou ao fim
		if ($('.obstaculo').eq(i).offset().top > $('#espaco').height() - $('.obstaculo').eq(i).width()) {
			$('.obstaculo').eq(i).remove();
			obst_fim++
		}
	}

	let intervalo_func = setTimeout(move_obstaculos, velocidade_obstaculos);

	if (quebra) {
		clearTimeout(intervalo_func);
	}
}

let colisoes = 0;
move_obstaculos();

function detecta_colisao($bloco) {

	/*
		Esta função detecta a colisão da nave com os blocos. Essa colisão pode ser acima, à esquerda, abaixo ou à direita. Para isso, pega-se o top e o left de cada bloco, bem como o top e left da nave. Além disso, são necessários o width e o height de cada um desses elementos. Baseando-se em limiares, fica mais simples detectar a colisão. Com esses limiares, define-se o espaço crítico, onde a colisão deve acontecer. E a colisão, por sua vez, é na verdade uma repulsão. Uma vez que a nave entra no espaço crítico, ela é repilida, diminuindo-se ou aumentando-se seu top ou seu left. O "nível de repulsão" é dado por uma constante, que pode ser alterada no início do código.
	*/

	let top_bloco = $bloco.offset().top;
	let left_bloco = $bloco.offset().left;

	let height_bloco = $bloco.height();
	let width_bloco = $bloco.width();

	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left;
	
	let height_nave = $('#nave').height();
	let width_nave = $('#nave').width();

	// ESQUERDA
	let limiar_esquerdo = left_bloco - width_bloco; // não pode ser maior do que isso
	// CIMA
	let limiar_superior = top_bloco - height_bloco; // não pode ser menor do que isso
	// BAIXO
	let limiar_inferior = top_bloco; // não pode passar disso
	// DIREITA
	let limiar_direito = left_bloco; // não pode ser menor do que isso;

	function dano() {
		$('#nave').css('box-shadow', '1px 1px 50px tomato');

		setTimeout(() => {
			$('#nave').css('box-shadow', 'none');
		}, 300);

	}

	if (left_nave >= limiar_esquerdo && left_nave < limiar_esquerdo + parcela_correcao) {
		if (top_nave < limiar_inferior + width_nave) {
			if (top_nave > limiar_superior) {
				//console.log('você tocou a esquerda do bloco');
				$('#nave').css('left', `-=${repelencia}px`);
				dano();
				colisoes++;
			}
		}
	}

	if (left_nave >= limiar_direito && left_nave < limiar_direito + width_bloco + parcela_correcao) {
		if (top_nave < limiar_inferior + width_nave) {
			if (top_nave > limiar_superior) {
				//console.log('você tocou a direita do bloco');
				$('#nave').css('left', `+=${repelencia}px`);
				dano();
				colisoes++;
			}
		}
	}

	if (top_nave >= limiar_inferior && top_nave < limiar_inferior + height_bloco + parcela_correcao) {
		if (left_nave < limiar_direito + width_nave) {
			if (left_nave > limiar_esquerdo) {
				//console.log('você tocou a parte de baixo do bloco');

				if (aleatorio(1, 2) == 1) {
					$('#nave').css('left', `+=${repelencia}px`);
				} else {
					$('#nave').css('left', `-=${repelencia}px`);
				}

				dano();
				colisoes++;
			}
		}
	}

}

function verifica_tiro($bloco) {

	// Funciona exatamente igual à função de detecção de colisão. Se o "laser", que nada mais é do que uma div cujo top é modificado para simular movimento, entra na região crítica de um obstáculo, o obstáculo é escondido e recebe a classe "obstaculo_destruido", para ser apagado no final.

	let top_laser = $('#laser').offset().top;
	let left_laser = $('#laser').offset().left;

	let height_laser = $('#laser').height();

	let top_bloco = $bloco.offset().top;
	let left_bloco = $bloco.offset().left;

	let height_bloco = $bloco.height();
	let width_bloco = $bloco.width();

	// O top do laser diminui progressivamente, porque está subindo
	// O top do bloco aumenta progressivamente, porque está descendo

	// Se o top do bloco é 500, o top do laser tem que ser menor do que isso, para ultrapassar o bloco. Porém, o top do laser precisa ser maior do que o top do bloco menos o height do bloco.

	if (top_laser < top_bloco && top_laser > top_bloco - height_bloco * 2) {
		if (left_laser > left_bloco && left_laser < left_bloco + width_bloco) {

			if ($bloco.hasClass('alt')) {

				$bloco.css('box-shadow', '1px 1px 50px lightgreen');

				if ($bloco.find('.valor_binario').text() == '1') {
					$bloco.find('.valor_binario').text('0');
				} else if ($bloco.find('.valor_binario').text() == '0') {
					$bloco.find('.valor_binario').text('1');
				}

				setTimeout(() => {
					$bloco.css('box-shadow', 'none');
				}, 250);

				verifica_formacao_binaria();

			} else {
				$bloco.css('background-image', 'linear-gradient(red, tomato)').css('box-shadow', '1px 1px 50px orange');
				setTimeout(() => {
					$bloco.fadeOut('600');
				}, 25);

				setTimeout(() => {
					$bloco.remove();
				}, 500);			
			}

			$('#laser').hide();
			$('#laser').css('top', '0px');

		}
	}

}

function verifica_formacao_binaria() {

	let formacao_binaria = '';

	for (let i = 0; i < $('.alt').length; i++) {

		formacao_binaria += $('.alt').eq(i).find('.valor_binario').text();

	}

	formacao_binaria = parseInt(formacao_binaria, 2);

	if (formacao_binaria == $('#numero_objetivo').text()) {

		toast('Parabéns, você formou o número objetivo!');

		$('#numero_atual').text(formacao_binaria);
		$('#numero_objetivo').text(aleatorio(0, 255));
	}

}

function verifica_limite_espaco() {

	// Esta função serve para evitar a nave de sair do espaço delimitado. Quando ele atinge o limite à direta, por exemplo, ela surge no início da esquerda.

	let top_espaco = $('#espaco').offset().top;
	let left_espaco = $('#espaco').offset().left;
	
	let height_espaco = $('#espaco').height();
	let width_espaco = $('#espaco').width();

	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left;
	
	let height_nave = $('#nave').height();
	let width_nave = $('#nave').width();

	// cima
	if (top_nave < passo_nave + 2) {
		$('#nave').css('top', `+=${passo_nave}px`);
	}

	// baixo
	if (top_nave > height_espaco - (height_nave / 2)) {
		$('#nave').css('top', `${height_espaco - height_nave}px`);
	}

	// direita
	if (left_nave > width_espaco + left_espaco - width_nave) {
		$('#nave').css('left', `${0}px`);
	}

	// esquerda
	if (left_nave < left_espaco + 10) {
		$('#nave').css('left', `${width_espaco - width_nave}px`);
	}

}

function gameover(msg) {

	toast(msg, 'brown');
	$('#bg_modal').fadeIn('2000');
	$('.obstaculo').remove();
	$('#espaco_obstaculos').css('top', '-600px');
	clearTimeout(move_obstaculos);
	quebra = true;
}

$('#jogar_novamente').click(() => {
	window.location.reload();
});


let tempo_restante = 59;
function temporizador() {

  let t = setTimeout(function() {
    
  	if (tempo_restante > 0) {
  		$('#tempo').text(tempo_restante--).css('color', 'green');
  	} else {
  		$('#tempo').text(tempo_restante--).css('color', 'tomato');
  		toast('Seu tempo acabou.', 'orange');
  	}

    if( tempo_restante >= 0) {
      temporizador();
    }
  }, 1000);

}
  
temporizador();

let tot_destruidos = 0;
let tot_sem_destruir = 0;

let c = 0;
let onda = 1;

toast('1ª onda.', 'darkblue');
cria_obstaculos(qtde_inicial_obstaculos);

// CENTRO DE AÇÕES

$('body').keydown(function(event) {

	// Este evento identifica as setas que foram pressionadas para mover a nave, bem como o espaço que serve para atirar. O uso do objeto "map" serve para identificar as setas que foram pressionadas ao mesmo tempo, a fim de realizar o movimento de diagonal.

	if ($('.obstaculo').length < qtde_inicial_obstaculos) {
		obst_dest = qtde_inicial_obstaculos - $('.obstaculo').length - obst_fim;
		$('#pontuacao').text(tot_destruidos + obst_dest);
	}


	$('#colisoes').text(colisoes);

    if (colisoes > 2) {
    	gameover('Opa, a sua nave quebrou!');
    	colisoes = 0;
    	exibiu = false;
    }
    
    // Aqui as ondas se iniciam
    if ($('.obstaculo').length == 0 && !quebra) {

    	tot_destruidos += obst_dest;
    	tot_sem_destruir += obst_fim;

    	$('#pontuacao').text(tot_destruidos);

    	obst_fim = 0;
    	onda++;
    	exibiu = false;
    	min_top_aleatorio = 350;
    	max_top_aleatorio = 600;
	    $('#espaco_obstaculos').css('top', `-${600}px`);

	    if (qtde_inicial_obstaculos <= 15) {
	    	qtde_inicial_obstaculos++;
	    }


    	cria_obstaculos(qtde_inicial_obstaculos);
    	toast(`${onda}ª onda.`, 'darkblue');

    }

	let tecla = event.keyCode;
	verifica_limite_espaco();

	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA
		$('#nave').css('left', `+=${passo_nave}`);

	}

	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA
		$('#nave').css('left', `-=${passo_nave}`);

	}

	if (tecla == 32) {
		// espaço
		tiros_dados++;

		$('#laser').show();
		let cont = 0;
		function atira () {
			pode_atirar = false;
			$('#laser').css('top', `-=${passo_laser}`);

			if ($('.obstaculo').length > 0) {
				for (let i = 0; i < $('.obstaculo').length; i++) {
					verifica_tiro($('.obstaculo').eq(i));
				}
			}

			for (let i = 0; i < $(`.alt`).length; i++) {
				verifica_tiro($(`.alt`).eq(i));
			}

			let tiro = setTimeout(atira, vel_recarga_laser);

			if (cont == limite_tiro) {
				clearTimeout(tiro);
				$('#laser').css('top', '-10px');
				$('#laser').hide();
				pode_atirar = true;
			}

			cont++;

		}

		if (pode_atirar) {
			atira();
		}

	}

});

// TOAST

function toast(texto, cor = 'green') {

	// Simplesmente exibe um toast.

	$('.toast').css('background', cor);

	if (cor != 'green') {
		$('.toast').css('color', '#fff');
		$('.toast').css('text-shadow', '1px 1px 3px #606060');
	}

	$('.toast').fadeIn('1000');
	$('.texto_toast').text(texto);

	setTimeout(function() {
		$('.toast').fadeOut('500');
	}, 1000);
}

$('.fechar').click(function() {
	$('.toast').fadeOut('500');
});

// FIM TOAST


// ALTERNATIVAS

let qtde_alternativas = 8;
let binario = '';
let numeros = [];
let x = 128;

numeros.push(x);
for (let i = 0; i < qtde_alternativas; i++) {

	if (x / 2 >= 1) {
		numeros.push(x = x / 2);
	}

}

for (let i = 0; i < qtde_alternativas; i++) {

	let r = aleatorio(0, 1);
	binario += r;
	let $a = $(`<div class="alt"><span class="ajuda">${(numeros[i])}</span><span class="valor_binario">${r}</span></div>`);
	$('#alternativas').append($a);

}

binario = parseInt(binario, 2);
let decimal = parseInt(binario, 10);
$('#numero_atual').text(decimal);