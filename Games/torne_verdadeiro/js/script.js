let qtde_colunas=5;
let qtde_linhas=6;
let qtde_elementos=qtde_colunas*qtde_linhas;
// CRIA MATRIZ E ENCHE DE ZEROS
let quadro=[];
for (let i=0; i<qtde_linhas; i++) {
	let linha=[];
	for (let j=0; j<qtde_colunas; j++) {
		linha.push(0);
	}
	quadro.push(linha);
}
// FAZ COM QUE TODOS FIQUEM LOCALIZÁVEIS DENTRO DE UMA MATRIZ
let k=0;
for (let i=qtde_linhas-1; i>=0; i--) {
	for (let j=0; j<qtde_colunas; j++) {
		let elemento=$("<div class='dimensao_filho'></div>");
		$('#quadro').append(elemento);
		quadro[i][j] = $('#quadro').children().eq(k);
		k++;
	}
}
// CRIA OS INPUTS DE ACORDO COM A QUANTIDADE DE COLUNAS
for(let i=0; i<qtde_colunas; i++){
	let input=$(`<div class="valor_input" id="${i}">${aleatorio(0, 1)}</div>`);
	$('#input').append(input);
}
// DIMENSIONA TODOS OS ELEMENTOS, PARA FICAREM DE ACORDO
let valor_pixels=50; 
let dimensao_pai=qtde_colunas*valor_pixels;
let dimensao_filho=dimensao_pai/qtde_colunas;
$('.config_base').css('grid-template-columns', `repeat(${qtde_colunas}, 1fr)`)
$('.dimensao_pai').css('width', `${dimensao_pai}px`);
$('.dimensao_filho').css('height', `${dimensao_filho}px`);

function atualiza_celula(celula, novo_estado){
	if(novo_estado=='on'){
		if($(celula).hasClass('off')){
			$(celula).removeClass('off');
		}
		if($(celula).hasClass('on')){
			$(celula).removeClass('on');
		}
		$(celula).addClass('on');
	}else{
		if($(celula).hasClass('on')){
			$(celula).removeClass('on');
		}
		if($(celula).hasClass('off')){
			$(celula).removeClass('off');
		}
		$(celula).addClass('off');
	}
}

// VERIFICA FIM
function verifica_fim(){
	let fim=true;
	let contador=0;
	for(let i=0; i<qtde_colunas; i++){
		if($(quadro[qtde_linhas-1][i]).hasClass('off')){
			fim=false;
		}else{
			if($(quadro[qtde_linhas-1][i]).hasClass('on')){
				contador++;
			}
		}
	}
	if(contador>0&&fim){
		fim=true;
		$('#output').text('VERDADEIRO');
		$('#output').css('background', 'darkgreen');
		$('#output').css('color', 'white');
	}else if(!fim){
		$('#output').text('FALSO');
		$('#output').css('background', 'brown');
		$('#output').css('color', 'white');
	}

	return fim;
}

// CONECTORES
function conectores(){
	for(let i=0; i<qtde_linhas; i++){
		for(let j=0; j<qtde_colunas; j++){
			// É preciso saber se o elemento anterior é um input e se esse input tem 1 ou 0. Se tiver 1, então o primeiro elemento da coluna em questão ficará ativo.
			if(i-1==-1){
				if(parseInt($(`#${j}`).text())==1){
					atualiza_celula(quadro[i][j], 'on');
				}else{
					atualiza_celula(quadro[i][j], 'off');					
				}
			// É preciso saber se o elemento anterior pode ser conectado ao atual e se o anterior está on ou off
			// Primeiro checa se o atual tem 'c' no texto; depois é feito o mesmo com o anterior; por fim, ao saber se ambos tem 'c', checa-se se o anterior está ativo, para enfim ativar ou desativar o atual, como se a corrente fosse transferida
			}else if(i-1>-1){
				if(em_string($(quadro[i][j]).text(), 'c')&&em_string($(quadro[i-1][j]).text(), 'c')&&$(quadro[i-1][j]).hasClass('on')){
					atualiza_celula(quadro[i][j], 'on');	
				}else if(em_string($(quadro[i][j]).text(), 'c')&&em_string($(quadro[i-1][j]).text(), 'c')&&$(quadro[i-1][j]).hasClass('off')){
					atualiza_celula(quadro[i][j], 'off');					
				}
			}
		}
	}
}

function and(){
	for(let i=0; i<qtde_linhas; i++){
		for(let j=0; j<qtde_colunas; j++){
			// ATIVA O AND, CASO ALGUM CONECTOR ANTERIOR A ELE ESTEJA LIGADO
			if($(quadro[i][j]).text()=='&'){
				if($(quadro[i-1][j]).hasClass('on')){
					atualiza_celula(quadro[i][j], 'on');
				}else if($(quadro[i-1][j]).hasClass('off')){
					atualiza_celula(quadro[i][j], 'off');
				}
			}
			// FAZ O AND ATIVAR ALGUM CONECTOR POSTERIOR, CASO AMBAS PARTES DO AND ESTEJAM LIGADAS
			// ON
			if($(quadro[i][j]).text()=='&'&&$(quadro[i][j]).hasClass('and1')&&$(quadro[i][j]).hasClass('on')){
				if($(quadro[i][j+1]).text()=='&'&&$(quadro[i][j+1]).hasClass('and2')&&$(quadro[i][j+1]).hasClass('on')){
					atualiza_celula(quadro[i+1][j], 'on');
					atualiza_celula(quadro[i+1][j+1], 'on');
				}
			}
			if($(quadro[i][j]).text()=='&'&&$(quadro[i][j]).hasClass('and2')&&$(quadro[i][j]).hasClass('on')){
				if($(quadro[i][j-1]).text()=='&'&&$(quadro[i][j-1]).hasClass('and1')&&$(quadro[i][j-1]).hasClass('on')){
					atualiza_celula(quadro[i+1][j], 'on');
					atualiza_celula(quadro[i+1][j-1], 'on');
				}
			}
			// OFF
			if($(quadro[i][j]).text()=='&'&&$(quadro[i][j]).hasClass('and1')&&$(quadro[i][j]).hasClass('off')){
				atualiza_celula(quadro[i+1][j], 'off');
				atualiza_celula(quadro[i+1][j+1], 'off');
			}
			if($(quadro[i][j]).text()=='&'&&$(quadro[i][j]).hasClass('and2')&&$(quadro[i][j]).hasClass('off')){
				atualiza_celula(quadro[i+1][j], 'off');
				atualiza_celula(quadro[i+1][j-1], 'off');
			}
		}
	}
	// Atualiza conectores
	conectores();
}

function not(){
	for(let i=0; i<qtde_linhas; i++){
		for(let j=0; j<qtde_colunas; j++){
			if($(quadro[i][j]).text()=='!'){
				if($(quadro[i-1][j]).hasClass('on')){
					atualiza_celula(quadro[i+1][j], 'off');
				}else if($(quadro[i-1][j]).hasClass('off')){
					atualiza_celula(quadro[i+1][j], 'on');
				}
			}
		}
	}
	// Atualiza conectores
	conectores();
}

// COLOCA IMAGENS DE ACORDO COM O TEXTO INSERIDO NA DIV
function coloca_imagens(){
	for(let i=0; i<qtde_linhas; i++){
		for(let j=0; j<qtde_colunas; j++){
			// CB = cima, baixo
			if($(quadro[i][j]).text()=='cb'){
				if($(quadro[i][j]).hasClass('on')){
					$(quadro[i][j]).css('background-image', "url('img/cb_on.jpg')");
				}else if($(quadro[i][j]).hasClass('off')){
					$(quadro[i][j]).css('background-image', "url('img/cb_off.jpg')");
				}else{
					$(quadro[i][j]).css('background-image', "url('img/cb.jpg')");
				}
			}
			// NOT
			if($(quadro[i][j]).text()=='!'){
				$(quadro[i][j]).css('background-image', "url('img/not.jpg')");
			}
			// AND
			if($(quadro[i][j]).text()=='&'&&!$(quadro[i][j]).hasClass('and2')){
				if($(quadro[i][j+1]).text()=='&'){
					$(quadro[i][j]).css('background-image', "url('img/and1.jpg')");
					$(quadro[i][j+1]).css('background-image', "url('img/and2.jpg')");
					$(quadro[i][j]).addClass('and1');
					$(quadro[i][j+1]).addClass('and2');
				}
			}
			// OR
			if($(quadro[i][j]).text()=='|'&&!$(quadro[i][j]).hasClass('or2')){
				if($(quadro[i][j+1]).text()=='|'){
					$(quadro[i][j]).css('background-image', "url('img/or1.jpg')");
					$(quadro[i][j+1]).css('background-image', "url('img/or2.jpg')");
					$(quadro[i][j]).addClass('or1');
					$(quadro[i][j+1]).addClass('or2');
				}
			}
		}
	}
}

// VERIFICA MUDANÇA NOS INPUTS
function atualiza_quadro(){
	conectores();
	not();
	and();
	coloca_imagens();
	verifica_fim();
}

// CIRCUITO DE TESTE 1

$(quadro[0][0]).text('cb');
$(quadro[1][0]).text('cb');
$(quadro[2][0]).text('!');
$(quadro[3][0]).text('cb');
$(quadro[4][0]).text('&');
$(quadro[5][0]).text('cb');

$(quadro[0][1]).text('cb');
$(quadro[1][1]).text('cb');
$(quadro[2][1]).text('&');
$(quadro[3][1]).text('cb');
$(quadro[4][1]).text('&');
$(quadro[5][1]).text('cb');

$(quadro[0][2]).text('cb');
$(quadro[1][2]).text('cb');
$(quadro[2][2]).text('&');
$(quadro[3][2]).text('cb');
$(quadro[4][2]).text('&');
$(quadro[5][2]).text('cb');

$(quadro[0][3]).text('cb');
$(quadro[1][3]).text('cb');
$(quadro[2][3]).text('&');
$(quadro[3][3]).text('cb');
$(quadro[4][3]).text('&');
$(quadro[5][3]).text('cb');

$(quadro[0][4]).text('cb');
$(quadro[1][4]).text('cb');
$(quadro[2][4]).text('&');
$(quadro[3][4]).text('cb');
$(quadro[4][4]).text('cb');
$(quadro[5][4]).text('cb');

atualiza_quadro();

$('.valor_input').click(function(){
	if($(this).text()=='1'){
		$(this).text('0');
	}else{
		$(this).text('1');
	}
	atualiza_quadro();
});

let audio=new Audio("audio/All This Useless Beauty - Jeremy Black.mp3");
function playpause(){
	if(audio.paused){
	 audio.play();
	} else {
	 audio.pause();
	}
}
$('#btn_play_pause').click(function(){
	playpause();
});

$('#btn_jogar').click(()=>{
	$('#jogo').show();
	$('#btn_jogar').hide();
	playpause();
});

$('#btn_ajuda').click(function(){
	$('#ajuda').toggle();
	if($('#btn_ajuda').text()=='Esconder ajuda'){
		$('#btn_ajuda').text('Mostrar ajuda');
	}else{
		$('#btn_ajuda').text('Esconder ajuda');
	}
});