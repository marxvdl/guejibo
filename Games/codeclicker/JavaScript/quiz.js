var perguntasQuiz=[
	'Termo utilizado para criar uma estrutura de repetição em Java:',
	'Qual dessas linguagens não é uma linguagem de programação?',
	'Considerando A = 10, B = 7 e C = 6, assinale a opção correta relacionada à lógica de programação.',
	'Considerando D = 20, E = 9 e F = 4, assinale a opção correta relacionada à lógica de programação.',
];
var qualResposta=[0,3,2,1];
var respostasQuiz=[
	['while','if','switch','else'],
	['JavaScript','Phyton','C','HTML'],
	['((B * 4) >= (A + A * 2) AND (5 + 5) >= (A)) ','(A + 3) > (B + C) ','((A + C) < (B * 2) OR (C + B * 3) < (A * 3))','(C * 3) <= (3 + C * 2)'],
	['((D * 2) <= (E * 4) OR (F * 5) = (D + 1))','((22 - D) >= (F / 4) AND (D * 2 - F) = (E * F))','((E + F) > (D - F) AND (D + F / 2) = (E + F - 1))','((D * D) < (E * F * 10))']

];
var acertou=0;
//Essa funcao faz aparecer um quiz que aumenta a producao de pontos caso o acertemos
setInterval(function() {
	var qualPergunta= Math.floor(Math.random() * qualResposta.length);
	$('#quiz').text(perguntasQuiz[qualPergunta]);
$( "#quiz" ).dialog({
	resizable: false,
	height: "auto",
	width: 400,
	modal: true,
	buttons: [
		{
		  text: respostasQuiz[qualPergunta][0],
		  click: function() {
			if(qualResposta[qualPergunta]===0){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				}
			$( this ).dialog( "close" );
		  }
	 
		},
		{
			text: respostasQuiz[qualPergunta][1],
			click: function() {
			  if(qualResposta[qualPergunta]===1){
				  boost=10;
				  acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[qualPergunta][2],
			click: function() {
			  if(qualResposta[qualPergunta]===2){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[qualPergunta][3],
			click: function() {
			  if(qualResposta[qualPergunta]===3){
				boost=10;
				acertou++;
				$('#boost').text('x10');
				setTimeout(function(){ 
					boost=1; 
					$('#boost').text(' ');
				}, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  }
	  ]
	
  });
},300000);