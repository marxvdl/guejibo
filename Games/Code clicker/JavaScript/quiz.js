var perguntasQuiz=[
	'Termo utilizado para criar uma estrutura de repetição em Java:',
	'Qual dessas linguagens não é uma linguagem de programação?'
];
var qualResposta=[0,3];
var respostasQuiz=[
	['while','if','switch','else'],
	['JavaScript','Phyton','C','HTML']

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