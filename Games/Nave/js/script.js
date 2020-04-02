let passo_nave = 2.875;
let passo_obstaculos = 1;
let velocidade_obstaculos = 10; // menos é mais
let qtde_inicial_obstaculos = 25;
let vel_recarga_laser = 10;
let passo_laser = 30;
let pode_atirar = true;
let limite_tiro = 25;
let valor_retorno = 5;
let repelencia = 100;
let parcela_correcao = 5;
let min_left_aleatorio = -100;
let max_left_aleatorio = 0;
let obst_fim = 0;
let obst_dest = 0;
let tiros_dados = 0;
let tiros_errados = 0;
let fim_jogo = false;
let qtde_movimento = 25;
let qtde_maxima_obstaculos = 25;
let pontuacao = 0;

let acoes_nave = {
	'moveu_esquerda':false,
	'moveu_direita':false,
	'atirou':false
};

function atira () {

	$('#laser').css('top', `-=${passo_laser}`);

	for (let i = 0; i < $(`.alt`).length; i++) {
		atira_alt($(`.alt`).eq(i))
	}

	for (let i = 0; i < $('.planeta').length; i++) {
		atira_planeta($('.planeta').eq(i));
	}

	for (let i = 0; i < $(`.alien`).length; i++) {
		atira_alien($(`.alien`).eq(i));
	}

	let tiro = window.requestAnimationFrame(atira);

	if ($('#laser').offset().top < 25) {

		window.cancelAnimationFrame(tiro);
		$('#laser').hide();
		$('#laser').css('top', '0px');

	}

}

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

function aleatorio(min, max) {

	// Gera um número aleatório entre o mínimo e o máximo, estando eles inclusos

	 min = Math.ceil(min);
	 max = Math.floor(max);

	 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cria_obstaculos(quantidade) {

	// Esta função cria os obstáculos do jogo. Todos eles são gerados em posições aleatórias. O top é definido negativamente, para que eles levem um tempo para chegar ao usuário.

	for (let i = 0; i < quantidade; i++) {

		let $obstaculo = $(`<div class="obstaculo"></div>`);
		// $($obstaculo).css('position', 'absolute');

		let left = aleatorio(min_left_aleatorio, max_left_aleatorio);
		let top = aleatorio(1, 50);

		let r = aleatorio(0, 3);

		if (r == 0) {
			$($obstaculo).css('border-radius', '50%');
			$($obstaculo).css('background-image', `linear-gradient(#${aleatorio(100, 999)}, #${aleatorio(100, 999)})`);
			$obstaculo.addClass('planeta');
		} else if (r == 1) {
			$($obstaculo).css('width', '100px');
			$($obstaculo).css('height', '100px');
			$($obstaculo).css('border-radius', '50%');
			$($obstaculo).css('background-image', `linear-gradient(#${aleatorio(100, 999)}, #${aleatorio(100, 999)})`);
			$obstaculo.addClass('planeta');
		} else {
			$($obstaculo).css('background-image', `url('img/alien.png')`);
			$obstaculo.addClass('alien');
		}

		$($obstaculo).css('top', `${top}%`);
		$($obstaculo).css('left', `${left}%`);
		$('#espaco').append($obstaculo);

	}

}

cria_obstaculos(qtde_inicial_obstaculos);

window.addEventListener('resize', function() {
	$('#espaco').css('width', `${window.innerWidth}px`);
	$('#espaco').css('height', `${window.innerHeight}px`);
});

let y = false;

function atualiza () {

	let c = 0;

	verifica_formacao_binaria();
	verifica_limite_espaco();
    
    // Aqui as ondas se iniciam
    if ($('.planeta').length == 0 && $('.alien').length == 0 && !fim_jogo) {
    	$('.obstaculo').css('left', '-100%');
    	cria_obstaculos(qtde_inicial_obstaculos);
    	qtde_inicial_obstaculos++;
    }

	$('.obstaculo').css('left', `+=${passo_obstaculos}`);

	for (let i = 0; i < $('.obstaculo').length; i++) {

		// Se o obstáculo chegou ao fim do espaço, ele fica escondido e recebe uma classe de chegou ao fim
		if ($('.obstaculo').eq(i).offset().left > $('#espaco').width() - $('.obstaculo').eq(i).width()) {
			$('.obstaculo').eq(i).remove();
			obst_fim++
			console.log('removi');
		}
	}

	if (acoes_nave['moveu_direita']) {

		while (acoes_nave['moveu_direita']) {
			$('#nave').css('left', '+=1px');
			if (c == 5) {
				break;
				acoes_nave['moveu_direita'] = false;
			}
			c++;
		}
	}

	if (acoes_nave['moveu_esquerda']) {
		
		while (acoes_nave['moveu_esquerda']) {
			$('#nave').css('left', '-=1px');
			if (c == 5) {
				break;
				acoes_nave['moveu_esquerda'] = false;
			}
			c++;
		}
	}

	if (acoes_nave['atirou']) {
		
		if (acoes_nave['atirou']) {
			acoes_nave['atirou'] = false;
			$('#laser').show();
			atira();
		}
	}

	let intervalo_func = setTimeout(atualiza, velocidade_obstaculos);
}

atualiza();

function atira_alt(alternativa) {

	let top_laser = $('#laser').offset().top;
	let left_laser = $('#laser').offset().left;

	let top_alternativa = $(alternativa).offset().top;
	let left_alternativa = $(alternativa).offset().left;

	let height_alternativa = $(alternativa).height();
	let width_alternativa = $(alternativa).width();

	if (top_laser < top_alternativa && top_laser > top_alternativa - height_alternativa) {
		if (left_laser > left_alternativa && left_laser < left_alternativa + width_alternativa) {

			$('#laser').hide();
			$('#laser').css('top', '0px');

			$(alternativa).css('box-shadow', '1px 1px 50px lightgreen');

			if ($(alternativa).find('.valor_binario').text() == '1') {
				$(alternativa).find('.valor_binario').text('0');
			} else if ($(alternativa).find('.valor_binario').text() == '0') {
				$(alternativa).find('.valor_binario').text('1');
			}

			setTimeout(() => {
				$(alternativa).css('box-shadow', 'none');
			}, 250);
		}
	}

}

function atira_planeta(planeta) {

	// Se o "laser", que nada mais é do que uma div cujo top é modificado para simular movimento, entra na região crítica de um obstáculo, o obstáculo é escondido e recebe a classe "obstaculo_destruido", para ser apagado no final.

	let top_laser = $('#laser').offset().top;
	let left_laser = $('#laser').offset().left;

	let top_planeta = $(planeta).offset().top;
	let left_planeta = $(planeta).offset().left;

	let height_planeta = $(planeta).height();
	let width_planeta = $(planeta).width();

	// O top do laser diminui progressivamente, porque está subindo
	// O top do bloco aumenta progressivamente, porque está descendo

	// Se o top do bloco é 500, o top do laser tem que ser menor do que isso, para ultrapassar o bloco. Porém, o top do laser precisa ser maior do que o top do bloco menos o height do bloco. Ou seja, precisa ultrapassar a parte de baixo do bloco.

	if (top_laser > 0 && left_laser > 0) {
		if (top_laser < top_planeta && top_laser > top_planeta - height_planeta) {
			if (left_laser > left_planeta && left_laser < left_planeta + width_planeta) {

				$('#laser').hide();
				$('#laser').css('top', '1px');	
				$(planeta).css('box-shadow', '1px 1px 50px tomato');
				setTimeout(() => {
					$(planeta).css('box-shadow', 'none')
				}, 250);


			}
		}
	}

}

function atira_alien(alien) {

	let top_laser = $('#laser').offset().top;
	let left_laser = $('#laser').offset().left;

	let top_alien = $(alien).offset().top;
	let left_alien = $(alien).offset().left;

	let height_alien = $(alien).height();
	let width_alien = $(alien).width();

	if (top_laser > 0 && left_laser > 0) {
		if (top_laser < top_alien && top_laser > top_alien - height_alien) {
			if (left_laser > left_alien && left_laser < left_alien + width_alien) {

				$('#laser').hide();
				$('#laser').css('top', '0px');

				$(alien).css('background-image', 'linear-gradient(red, tomato)').css('box-shadow', '1px 1px 50px orange');
				setTimeout(() => {
					$(alien).fadeOut('600');
				}, 25);

				setTimeout(() => {
					$(alien).remove();
					pontuacao++;
					$('#pontuacao').text(pontuacao);
				}, 500);	

			}
		}
	}

}

function verifica_formacao_binaria() {

	let formacao_binaria = '';

	for (let i = 0; i < $('.alt').length; i++) {

		formacao_binaria += $('.alt').eq(i).find('.valor_binario').text();

	}

	formacao_binaria = parseInt(formacao_binaria, 2);

	$('#numero_atual').text(formacao_binaria);

	if (formacao_binaria == $('#numero_objetivo').text()) {

		toast('Parabéns, você conseguiu!');
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

	// direita
	if (left_nave > width_espaco - width_nave) {
		$('#nave').css('left', `${10}px`);
	}

	// esquerda
	if (left_nave < left_espaco) {
		$('#nave').css('left', `${width_espaco - width_nave}px`);
	}

}

function gameover(msg) {

	toast(msg, 'brown');
	$('#bg_modal').fadeIn('2000');
	$('.obstaculo').remove();
	fim_jogo = true;
	clearTimeout(intervalo_func);
}

$('#jogar_novamente').click(() => {
	window.location.reload();
});


let tempo_restante = 59;
function temporizador() {

  let t = setTimeout(function() {
    
  	if (tempo_restante > 0) {
  		$('#tempo').text(tempo_restante--).css('color', 'black');
  	} else {
  		$('#tempo').text(tempo_restante--).css('color', 'brown');
  		toast('Seu tempo acabou.', 'orange');
  	}

    if( tempo_restante >= 0) {
      temporizador();
    }
  }, 1000);

}
  
temporizador();

// CENTRO DE AÇÕES

$('body').keydown(function(event) {

	let tecla = event.keyCode;

	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita'] = true;
	}

	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda'] = true;
	}

	if (tecla == 32) {
		// espaço
		tiros_dados++;
		acoes_nave['atirou'] = true;
	}

});

$('body').keyup(function(event) {

	let tecla = event.keyCode;

	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita'] = false;
	}

	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda'] = false;
	}

	// if (tecla == 32) {
	// 	// espaço
	// 	acoes_nave['atirou'] = false;
	// 	$('#laser').css('top', '0px');
	// 	$('#laser').hide();
	// }

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

$('#numero_objetivo').text(aleatorio(1, 255));