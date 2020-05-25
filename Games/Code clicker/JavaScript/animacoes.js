//Anima o gif do computador quandos passamos o mouse por cima dele
$("#Pczinho").mouseover(function() {
	$('#Pczinho').attr('src',"PixelArts/button_teclado.gif");
});
//Para a animacao do gif do computador quando tiramos o mouse de cima dele
$("#Pczinho").mouseout(function() {
	$('#Pczinho').attr('src','PixelArts/button_teclado_frame_zero.gif');
	$('#Pczinho').stop(true,true);
});
//diminui e aumenta o tamanho do gif do computador quando clicamos nele
$("#Pczinho").mousedown(function() {
	$('#Pczinho').animate({

		height: 'auto',
		width: '97%'
	},40);
});
$("#Pczinho").mouseup(function() {
	$('#Pczinho').animate({

		height: 'auto',
		width: '100%'
	},40);
});
