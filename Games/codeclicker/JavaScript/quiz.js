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
	'Numa reunião de ex-alunos de um colégio havia cem pessoas. Cada uma dessas pessoas ou era pós-graduada ou era simplesmente graduada. Além disso, há informações sobre os seguintes fatos: pelo menos uma dessas pessoas era pós-graduada; dadas quaisquer duas dessas pessoas, pelo menos uma das duas era simplesmente graduada. Qual o número de pessoas pós-graduadas na referida reunião?'
];
var qualResposta=[0,3,2,1,3,0,2,1,3,2,0];
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
	[ '1','50','51','99']


	
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
//Essa funcao faz aparecer um quiz que aumenta a producao de pontos caso o acertemos

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