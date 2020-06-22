var perguntasQuiz=[
	'Termo utilizado para criar uma estrutura de repetição em JavaScript:',
	'Qual dessas linguagens não é uma linguagem de programação?',
	'Considerando A = 10, B = 7 e C = 6, assinale a opção correta relacionada à lógica de programação.',
	'Considerando D = 20, E = 9 e F = 4, assinale a opção correta relacionada à lógica de programação.',
	'Quantos bytes são necessários para armazenar uma variável int na linguagem Java?',
	'Uma quantia em dinheiro foi dividida entre 4 pessoas. Sabe-se que cada pessoa gastou a metade do dinheiro que recebeu, e 1/4 do restante do dinheiro de cada pessoa foi colocado em uma caixa, totalizando R$20,00. Assinale a quantia dividida inicialmente:',
	'Qual sinal de pontuação é comumente usado em linguagens de programação para terminar uma instrução?',
	'Qual o significado da abreviação "HTML"?',
	'Um empresário resolve premiar três funcionários que se destacaram no ano de 2011. Uma quantia em dinheiro é dividida entre eles em partes inversamente proporcionais ao número de faltas injustificadas de cada um em 2011, ou seja: 3, 5 e 8 faltas. Se o valor do prêmio do funcionário que recebeu a menor quantia foi de R$ 6.000,00, então o valor do prêmio do funcionário que recebeu a maior quantia foi igual a',
	'Considere que os termos da sequência seguinte foram sucessivamente obtidos segundo determinado padrão:  (3,  7,  15,  31,  63,  127,  255,  ...) O décimo termo dessa sequência é ',
	'Numa reunião de ex-alunos de um colégio havia cem pessoas. Cada uma dessas pessoas ou era pós-graduada ou era simplesmente graduada. Além disso, há informações sobre os seguintes fatos: pelo menos uma dessas pessoas era pós-graduada; dadas quaisquer duas dessas pessoas, pelo menos uma das duas era simplesmente graduada. Qual o número de pessoas pós-graduadas na referida reunião?',
	'Uma loja vende barras de chocolate de diversos sabores. Em uma promoção, era possível comprar três barras de chocolate com desconto, desde que estas fossem dos sabores ao leite, amargo, branco  ou com amêndoas, repetidos ou não. Assim, um cliente que comprar as três barras na promoção poderá escolher os sabores de n modos distintos, sendo n igual a:',
	'(MPOG/2001) Dizer que “André é artista ou Bernardo não é engenheiro” é logicamente equivalente a dizer que:',
	'(AFC - 2002 / ESAF) Dizer que não é verdade que Pedro é pobre e Alberto é alto, é logicamente equivalente a dizer que é verdade que:',
	' A negação da afirmação condicional “se estiver chovendo, eu levo o guarda-chuva” é:',
	'(Fiscal Trabalho/98) Dizer que “Pedro não é pedreiro ou Paulo é paulista” é, do ponto de vista lógico, o mesmo que dizer que:',
	'(ICMS–SP/1997) Se os tios de músicos sempre são músicos, então',
	'Se Rodrigo mentiu, então ele é culpado. Logo: ',
	'A sentença “penso, logo existo” é logicamente equivalente a: ',
	'Considere verdadeira a seguinte proposição composta: “Se Mariana chegar, então Antônio dormirá.” É correto concluir que',
	'Uma afirmação equivalente à afirmação “Se bebo, então não dirijo” é',
	'Se Alceu tira férias, então Brenda fica trabalhando. Se Brenda fica trabalhando, então Clóvis chega mais tarde ao trabalho. Se Clóvis chega mais tarde ao trabalho, então Dalva falta ao trabalho. Sabendo-se que Dalva não faltou ao trabalho, é correto concluir que',
	'X e Y são números tais que: Se X ≤ 4, então Y > 7. Sendo assim:',
	'Considere verdadeira a seguinte proposição: “Se x = 3, então x é primo”. Pode-se concluir que',
	'Se Lauro sair cedo do trabalho, então jantará com Lúcia. Se Lúcia janta com Lauro, então não come na manhã seguinte. Sabendo-se que, essa manhã, Lúcia comeu, conclui-se que',
	'Considerando que os números naturais x e y sejam tais que “se x é ímpar, então y é divisível por 3”, é correto afirmar que',

];
var qualResposta=[0,3,2,1,3,0,2,1,3,2,0,3,3,0,3,0,0,3,2,3,3,2,0,1,2,3];
var respostasQuiz=[
	['while','if','switch','else'],
	['JavaScript','Phyton','C','HTML'],
	['((B * 4) >= (A + A * 2) AND (5 + 5) >= (A)) ','(A + 3) > (B + C) ','((A + C) < (B * 2) OR (C + B * 3) < (A * 3))','(C * 3) <= (3 + C * 2)'],
	['((D * 2) <= (E * 4) OR (F * 5) = (D + 1))','((22 - D) >= (F / 4) AND (D * 2 - F) = (E * F))','((E + F) > (D - F) AND (D + F / 2) = (E + F - 1))','((D * D) < (E * F * 10))'],
	['1 byte','2 bytes','3 bytes','4 bytes'],
	['R$160,00','R$180,00','R$120,00','R$200,00'],
	['.',',',';','!'],
	['HyperTexting Markup Language','HyperText Markup Language','HyperText Marking Language','HyperText Markup Lang'],
	['R$ 12.000,00','R$ 15.000,00','R$ 15.600,00','R$ 16.000,00'],
	['1929','1945','2047','2319'],
	[ '1','50','51','99'],
	['10','12','16','20'],
	['André é artista se e somente se Bernardo não é engenheiro.','Se André é artista, então Bernardo não é engenheiro.','Se André não é artista, então Bernardo é engenheiro.','Se Bernardo é engenheiro, então André é artista.'],
	['Pedro não é pobre ou Alberto não é alto.','Pedro não é pobre e Alberto não é alto.','Pedro é pobre ou Alberto não é alto.','se Pedro não é pobre, então Alberto é alto.']
	['não está chovendo e eu levo o guarda-chuva','não está chovendo e eu não levo o guarda-chuva','se estiver chovendo, eu não levo o guarda-chuva','está chovendo e eu não levo o guarda-chuva'],
	['se Pedro é pedreiro, então Paulo é paulista','se Paulo é paulista, então Pedro é pedreiro','se Pedro não é pedreiro, então Paulo é paulista','se Pedro é pedreiro, então Paulo não é paulista'],
	['os sobrinhos de não músicos nunca são músicos;','os sobrinhos de não músicos sempre são músicos;','os sobrinhos demúsicos sempre são músicos;','os sobrinhos de músicos nunca são músicos;'],
	['Rodrigo é culpado.','se Rodrigo não mentiu, então ele não é culpado.','Rodrigo mentiu.','se Rodrigo não é culpado, então ele não mentiu.'],
	['Penso e existo.','Nem penso, nem existo.','Não penso ou existo.','Penso ou não existo.'],
	['se Mariana não chegar, então Antônio não dormirá.','se Antônio dormir, então Mariana chegou.','se Antônio não dormir, então Mariana chegou.','se Antônio não dormir, então Mariana não chegou.'],
	['Se não dirijo, então não bebo.','Se não dirijo, então bebo.','Se não bebo, então dirijo.','Se dirijo, então não bebo.'],
	['Alceu não tira férias e Clóvis chega mais tarde ao trabalho.','Brenda não fica trabalhando e Clóvis chega mais tarde ao trabalho.','Clóvis não chega mais tarde ao trabalho e Alceu não tira férias.','Brenda fica trabalhando e Clóvis chega mais tarde ao trabalho'],
	['Se Y ≤ 7, então X > 4.','Se Y > 7, então X ≥ 4.','Se X ≥ 4, então Y < 7.','Se Y < 7, então X ≥ 4.'],
	[' se x não é primo, então x ≠ 3','se x não é primo, então x = 3','se x ≠ 3, então x é primo','se x ≠ 3, então x não é primo'],
	[' Lúcia jantará esta noite.','Lauro jantou na noite anterior.','Lauro não saiu cedo do trabalho.','Lauro saiu cedo do trabalho.'],
	['se x é par, então y não é divisível por 3.','se y é divisível por 3, então x é ímpar.','se y = 9, então x é par.','se y = 10, então x é par.']

];
var qualpergunta=0;
var ordemperguntas=[];

for(var x=0; x<perguntasQuiz.length;x++){
	ordemperguntas[x]=x;
}
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
ordemperguntas = shuffle(ordemperguntas);

var acertou=0;
//Essa funcao faz aparecer um quiz que aumenta a producao de pontos caso o acertemos.

setInterval(function() {
	if(qualpergunta>=perguntasQuiz.length){
		ordemperguntas= shuffle(ordemperguntas);
		qualpergunta=0;
	}
	
	$('#quiz').text(perguntasQuiz[ordemperguntas[qualpergunta]]);
	
$( "#quiz" ).dialog({
	resizable: false,
	height: "auto",
	width: "80%",
	modal: true,
	buttons: [
		{
		  text: respostasQuiz[ordemperguntas[qualpergunta]][0],
		  click: function() {
			if(qualResposta[ordemperguntas[qualpergunta]]===0){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				}
				qualpergunta++;
			$( this ).dialog( "close" );
		  }
	 
		},
		{
			text: respostasQuiz[ordemperguntas[qualpergunta]][1],
			click: function() {
			  if(qualResposta[ordemperguntas[qualpergunta]]===1){
				  boost=10;
				  acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
				  qualpergunta++;
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[ordemperguntas[qualpergunta]][2],
			click: function() {
			  if(qualResposta[ordemperguntas[qualpergunta]]===2){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
				  qualpergunta++;
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[ordemperguntas[qualpergunta]][3],
			click: function() {
				
			  if(qualResposta[ordemperguntas[qualpergunta]]===3){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
				  qualpergunta++;
			  $( this ).dialog( "close" );
			}
	   
		  }
	  ]
	
  });
 
},300000);