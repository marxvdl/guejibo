let passo_nave = 1;
let passo_obstaculos = 1;
let velocidade_obstaculos = 10; // menos é mais
let quantidade_obstaculos = 3;

let vel_laser = 10;
let vel_recarga_laser = 150;
let passo_laser = 30;

let valor_retorno = 5;
let repelencia = 100;
let parcela_correcao = 5;

let min_top_aleatorio = 300;
let max_top_aleatorio = 600;

let obst_fim = 0;
let obst_dest = 0;

let tiros_dados = 0;
let tiros_errados = 0;

let quebra = false;

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

		// if (i == 0) {
		// 	$($obstaculo).css('background', 'tomato');
		// } else {
		// 	$($obstaculo).css('background', `#${aleatorio(100, 999)}`);
		// }

		$($obstaculo).css('top', `${top}px`);
		$($obstaculo).css('left', `${left}px`);
		$('#espaco_obstaculos').append($obstaculo);

	}

}

function move_obstaculos () {

	// Esta função simplesmente incrementa o top cada um dos obstáculos. Ela fica dentro de um intervalo, que está logo abaixo.

	if ($('#espaco_obstaculos').offset().top < 600) {
		$('#espaco_obstaculos').css('top', `+=${passo_obstaculos}`);
	}

	for (let i = 0; i < $('.obstaculo').length; i++) {

		// É preciso chamar a função que detecta a colisão para os obstáculos também
		detecta_colisao($('.obstaculo').eq(i));

		// Se o obstáculo chegou ao fim do espaço, ele fica escondido e recebe uma classe de chegou ao fim
		if ($('.obstaculo').eq(i).offset().top > $('#espaco').height() - $('.obstaculo').eq(i).width()) {
			$('.obstaculo').eq(i).remove();
			obst_fim++
			console.log('removi: ' + obst_fim);
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
		$('#nave').css('border', '1px solid red');

		setTimeout(() => {
			$('#nave').css('border', 'none');
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

	if (top_nave >= limiar_superior && top_nave < limiar_superior + parcela_correcao) {
		if (left_nave < limiar_direito + width_nave) {
			if (left_nave > limiar_esquerdo) {
				//console.log('você tocou a parte de cima do bloco');
				$('#nave').css('left', `-=${repelencia}px`);
				dano();
				colisoes++;
			}
		}
	}

	if (top_nave >= limiar_inferior && top_nave < limiar_inferior + height_bloco + parcela_correcao) {
		if (left_nave < limiar_direito + width_nave) {
			if (left_nave > limiar_esquerdo) {
				//console.log('você tocou a parte de baixo do bloco');
				$('#nave').css('left', `+=${repelencia}px`);
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

	if (top_laser < top_bloco && top_laser > top_bloco - height_bloco - height_laser) {
		if (left_laser > left_bloco && left_laser < left_bloco + width_bloco) {

			$bloco.css('background', 'tomato').css('box-shadow', '5px 5px 50px orange').css('border', '1px dotted red');
			setTimeout(() => {
				$bloco.fadeOut('600');
			}, 300);

			setTimeout(() => {
				$bloco.remove();
			}, 1000);
		}
	}

	if (top_laser > top_bloco && top_laser < top_bloco + height_bloco) {
		if (left_laser > left_bloco && left_laser < left_bloco + width_bloco) {

			$bloco.css('background', 'tomato').css('box-shadow', '5px 5px 50px orange').css('border', '1px dotted red');
			setTimeout(() => {
				$bloco.fadeOut('600');
			}, 300);

			setTimeout(() => {
				$bloco.remove();
			}, 1000);
		}
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
	$('#bg_modal').show();
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

let cima_esquerda = {38: false, 37: false};
let cima_direita = {38: false, 39: false};
let baixo_esquerda = {40: false, 37: false};
let baixo_direita = {40: false, 39: false};

let tot_destruidos = 0;
let tot_sem_destruir = 0;

let c = 0;
let fase = 1;

toast('Fase 1', 'darkblue');
cria_obstaculos(quantidade_obstaculos);

// CENTRO DE AÇÕES

$('body').keydown(function(event) {

	// Este evento identifica as setas que foram pressionadas para mover a nave, bem como o espaço que serve para atirar. O uso do objeto "map" serve para identificar as setas que foram pressionadas ao mesmo tempo, a fim de realizar o movimento de diagonal.

	if ($('.obstaculo').length < quantidade_obstaculos) {
		obst_dest = quantidade_obstaculos - $('.obstaculo').length - obst_fim;
		console.log('[TEMPO REAL] Destruiu: ' + obst_dest);

		$('#pontuacao').text(tot_destruidos + obst_dest);
	}


	$('#colisoes').text(colisoes);

    if (colisoes > 2) {
    	gameover('Opa, a sua nave quebrou!');
    	colisoes = 0;
    	exibiu = false;
    }

    // Aqui as fases se iniciam
    if ($('.obstaculo').length == 0 && !quebra) {

    	tot_destruidos += obst_dest;
    	tot_sem_destruir += obst_fim;

    	$('#pontuacao').text(tot_destruidos);

    	obst_fim = 0;

    	fase++;
    	exibiu = false;
    	$('#espaco_obstaculos').css('top', '-600px');

    	if (min_top_aleatorio >= 0) {
    		min_top_aleatorio -= 25;
    	} 

    	if (quantidade_obstaculos < 18) {
    		quantidade_obstaculos += 2;
    		console.log('Nova quantidade de obstáculos: ' + quantidade_obstaculos);
    	}
    	
    	cria_obstaculos(quantidade_obstaculos);
    	toast(`Fase ${fase}.`, 'darkblue');

    }

	let tecla = event.keyCode;
	verifica_limite_espaco();

	if(tecla == 38) {
		 // seta pra CIMA
		$('#nave').css('transform', 'rotate(0deg)');

		let cont = 1;
		function move_cima() {

			$('#nave').css('top', `-=${passo_nave}`);
			let id_parada = requestAnimationFrame(move_cima);
			cont++;

			if (cont == 20) {
				cancelAnimationFrame(id_parada);
			}
		}

		move_cima();
	}

	if(tecla == 40) {
		// seta pra BAIXO
		$('#nave').css('transform', 'rotate(180deg)');

		let cont = 1;
		function move_baixo() {

			$('#nave').css('top', `+=${passo_nave}`);
			let id_parada = requestAnimationFrame(move_baixo);
			cont++;

			if (cont == 20) {
				cancelAnimationFrame(id_parada);
			}
		}

		move_baixo();

	}

	if(tecla == 39) {
		 // seta pra DIREITA
		$('#nave').css('transform', 'rotate(90deg)');

		let cont = 1;
		function move_direita() {

			$('#nave').css('left', `+=${passo_nave}`);
			let id_parada = requestAnimationFrame(move_direita);
			cont++;

			if (cont == 20) {
				cancelAnimationFrame(id_parada);
			}
		}

		move_direita();
	}

	if(tecla == 37) {
		 // seta pra ESQUERDA

		 $('#nave').css('transform', 'rotate(-90deg)');

		let cont = 1;
		function move_esquerda() {

			$('#nave').css('left', `-=${passo_nave}`);
			let id_parada = requestAnimationFrame(move_esquerda);
			cont++;

			if (cont == 20) {
				cancelAnimationFrame(id_parada);
			}
		}

		move_esquerda();
	}


	// diagonal direita
    if (tecla in cima_esquerda) {
        cima_esquerda[tecla] = true;
        if (cima_esquerda[38] && cima_esquerda[37]) {

        	$('#nave').css('transform', 'rotate(-45deg)');
			let cont = 1;
			function move_cima_esquerda() {

	        	$('#nave').css('top', `-=${passo_nave}`);
	        	$('#nave').css('left', `-=${passo_nave}`);
				let id_parada = requestAnimationFrame(move_cima_esquerda);
				cont++;

				if (cont == 20) {
					cancelAnimationFrame(id_parada);
				}
			}

			move_cima_esquerda();

        }
    }

    if (tecla in cima_direita) {
        cima_direita[tecla] = true;
        if (cima_direita[38] && cima_direita[39]) {

        	$('#nave').css('transform', 'rotate(45deg)');
			let cont = 1;
			function move_cima_direita() {

	        	$('#nave').css('top', `-=${passo_nave}`);
	        	$('#nave').css('left', `+=${passo_nave * 2}`);
				let id_parada = requestAnimationFrame(move_cima_direita);
				cont++;

				if (cont == 20) {
					cancelAnimationFrame(id_parada);
				}
			}

			move_cima_direita();
        }
    }

    if (tecla in baixo_esquerda) {
        baixo_esquerda[tecla] = true;
        if (baixo_esquerda[40] && baixo_esquerda[37]) {

        	$('#nave').css('transform', 'rotate(225deg)');
			let cont = 1;
			function move_baixo_esquerda() {

	        	$('#nave').css('top', `+=${passo_nave}`);
	        	$('#nave').css('left', `-=${passo_nave}`);
				let id_parada = requestAnimationFrame(move_baixo_esquerda);
				cont++;

				if (cont == 20) {
					cancelAnimationFrame(id_parada);
				}
			}

			move_baixo_esquerda();

        }
    }

    if (tecla in baixo_direita) {
        baixo_direita[tecla] = true;
        if (baixo_direita[40] && baixo_direita[39]) {

        	$('#nave').css('transform', 'rotate(-225deg)');
			let cont = 1;
			function move_baixo_direita() {

	        	$('#nave').css('top', `+=${passo_nave}`);
	        	$('#nave').css('left', `+=${passo_nave}`);
				let id_parada = requestAnimationFrame(move_baixo_direita);
				cont++;

				if (cont == 20) {
					cancelAnimationFrame(id_parada);
				}
			}

			move_baixo_direita();
        }
    }

	if (tecla == 32) {
		// espaço
		tiros_dados++;

		$('#laser').show();

		function atira () {
			$('#laser').css('top', `-=${passo_laser}`);

			if ($('.obstaculo').length > 0) {
				for (let i = 0; i < $('.obstaculo').length; i++) {
					verifica_tiro($('.obstaculo').eq(i));
				}
			}		

		}

		let tiro = setInterval(atira, vel_laser);

		setTimeout(() => {
			clearInterval(tiro);
			$('#laser').css('top', '-35px');
			$('#laser').hide();
		}, vel_recarga_laser);
	}

}).keyup(function(e) {
	    if (e.keyCode in cima_esquerda) {
	        cima_esquerda[e.keyCode] = false;
	    }

	    if (e.keyCode in cima_direita) {
	        cima_direita[e.keyCode] = false;	    	
	    }

	    if (e.keyCode in baixo_esquerda) {
	        baixo_esquerda[e.keyCode] = false;	    	
	    }

	    if (e.keyCode in baixo_direita) {
	        baixo_direita[e.keyCode] = false;	    	
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
