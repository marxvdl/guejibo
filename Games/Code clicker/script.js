var pontuacao=10000000000;
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
  });
pontuacaoAcumulada=0;
var ps=0.0;
var qualCodigo=0;
const codigo=[`import java.io.*;
import java.util.Scanner;
public class Tbe {
	static int gt;
	static String[] itens= new String[100];
	static int[] quantidade= new int[100];
	static void salvar() throws IOException {
		//Tem a função de salvar o arquivo.
		BufferedWriter e= new BufferedWriter( new FileWriter("Inventário", false));
		for(int x=0;x<gt;x++) {
			e.write(itens[x]);
			e.write("--");
			e.write(""+quantidade[x]);
			e.newLine();
		}
		e.close();
	}
    static void info() {
    	//Informa a quantidade de um item específico.
    	Scanner t= new Scanner (System.in);
        System.out.println("Digite o nome do item");
		String s2= t.nextLine();
		int g2= 0;
		for(int x=0;x<gt;x++) {
			if(s2.equals(itens[x])) {
				System.out.println(quantidade[x]);
				g2=1;
				break;
			}
	    }
			if(g2==0) {
			System.out.println("Item inexistente");
			}
			t.close();
        }
    static void sub() {
    	//Tem função de retirar itens.
        Scanner t= new Scanner (System.in);
        System.out.println("Digite o nome do item");
	    String s1= t.nextLine();
	    System.out.println("Quantos?");
				
	    int ç1=t.nextInt();
	    int g1= 0;
	    for(int x=0;x<gt;x++) {
	        if(s1.equals(itens[x])) {
	        	if(quantidade[x]>ç1) {
	        		quantidade[x]=quantidade[x]-ç1;
	        	}else {
					System.out.println("Quantidade de "+s1+" < "+ç1);
				}
				g1=1;
				break;
				}
			}
		if(g1==0) {
			System.out.println("Item inexistente");
		}
		t.close();
    }
        static void ad() {
        	//Tem função de adicionar itens.
        	Scanner t= new Scanner (System.in);
        	System.out.println("Digite o nome do item");
			String s= t.nextLine();
			
			int g= 0;
			System.out.println("Quantos?");
			int ç=t.nextInt();
			t.nextLine();
			for(int x=0;x<gt;x++) {
				if(s.equals(itens[x])) {
					quantidade[x]=quantidade[x]+ç;
					g=1;
					break;
				}
			}
			if(g==0) {
				System.out.println("Item inexistente");
			}
			t.close();
        }
	static void criar() throws IOException {
		//Tem a função de criar o inventário ou de adicionar um novo item.
		BufferedWriter e= new BufferedWriter( new FileWriter("Inventário", true));
		Scanner t= new Scanner(System.in);
		System.out.println("Digite a quantidade de tipos de itens ");
		int b= t.nextInt();
		t.nextLine();
		System.out.println("Digite o nome dos itens e sua quantidade, separando o nome do item e a quantia por \"--\"");
		for(int x=0;x<b;x++) {
			String f= t.nextLine();
			e.write(f);
			e.newLine();
		}
		e.close();
		t.close();
	}
    static void ler() throws IOException {
    	//Tem a função de transformar o arquivo em vetores
        Scanner a= new Scanner(new File("Inventário"));
        int n1 = 0;
		String linha;
		
		while(a.hasNextLine()) {
			linha = a.nextLine();
			String[] token = linha.split("--");
			itens[n1] = token[0];
			String po = token[1];
			quantidade[n1]= Integer.parseInt(po);
			n1++;
			gt++;
		}
		a.close();
    }
    
	public static void main(String[] args) throws IOException  {
		Scanner t= new Scanner(System.in);
		BufferedWriter e= new BufferedWriter( new FileWriter("Inventário", true));
		Scanner a= new Scanner(new File("Inventário"));
		gt=0;
		if(!a.hasNextLine()) {
			criar();
		}
		e.close();
		a.close();
        ler();
		int h=1;
		boolean p= false;
		 do{
			 
			 System.out.println("Digite 1 para adicionar itens, digite 2 para retirar itens, digite 3 para informar quantos itens tem, digite 4 para adicionar um novo item, digite 5 para fechar o programa");
			int y=t.nextInt();
			p=true;
			switch (y) {
			case 1:
				ad();
				break;
			case 2:
				sub();
				break;
				
			case 3:
				info();
				break;
			case 4:
				criar();
				break;
			case 5:
				h=0;
			default:
				System.out.println("Você não digitou um número válido");	
			}
			t.nextLine();
		
		}while(h==1);
		salvar();
		t.close();
		
	}
}`,`package br.edu.cbra.ifb.lpoo;
import java.awt.BorderLayout;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JComboBox;
public class PesParaMetros extends JFrame {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private JPanel contentPane;
	private JTextField textField;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					PesParaMetros frame = new PesParaMetros();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	/**
	 * Create the frame.
	 */
	String unidadeDeMedida;
	public PesParaMetros() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		textField = new JTextField();
		textField.setBounds(35, 31, 118, 36);
		contentPane.add(textField);
		textField.setColumns(10);
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setBounds(35, 78, 346, 14);
		contentPane.add(lblNewLabel);
		JButton btnNewButton = new JButton(" Converter");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				double c=Double.parseDouble(textField.getText());
				
				switch(unidadeDeMedida) {
				case "pés e polegadas":
					int feet= (int) (c/0.3048);
					int inch=(int) ((c-feet*0.3048)/0.0254);
					lblNewLabel.setText("Valor em pés e polegadas: "+ feet+"' "+inch+"\"");
					break;
				case "somente pés":
					double feet1=(c/0.3048);
					lblNewLabel.setText("Valor em pés: "+ feet1+"' ");
					break;
				case "somente polegadas":
					double inch1= (c/0.0254);
					lblNewLabel.setText("Valor em polegadas: "+inch1+"\"");
					break;
				case "jardas":
					double jarda=c/1.09361;
					lblNewLabel.setText("valor em jardas: "+jarda+"yd");
					break;
				case "milhas":
					double milha=c*0.000621371;
					lblNewLabel.setText("valor em milhas: "+milha+"mi");
					break;
				}
				
			}
		});
		btnNewButton.setBounds(170, 38, 103, 23);
		contentPane.add(btnNewButton);
		
		JLabel lblDigiteOValor = new JLabel("Digite o valor em metros:");
		lblDigiteOValor.setBounds(35, 6, 154, 20);
		contentPane.add(lblDigiteOValor);
		
		JButton btnNewButton_1 = new JButton("Escolher unidade de medida");
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				String opcoes[]= {"pés e polegadas", "somente pés","somente polegadas","jardas","milhas"};
				Object escolha=JOptionPane.showInputDialog(null,"selecione para que medida vc deseja converter:", "Unidade de Medida",JOptionPane.PLAIN_MESSAGE, null,opcoes,"");
				String e= escolha.toString();
				switch(e) {
				case "pés e polegadas":
					unidadeDeMedida="pés e polegadas";
					break;
				case "somente pés":
					unidadeDeMedida="somente pés";
					break;
				case "somente polegadas":
					unidadeDeMedida="somente polegadas";
					break;
				case "jardas":
					unidadeDeMedida="jardas";
					break;
				case "milhas":
					unidadeDeMedida="milhas";
					break;
				
				}
			}
		});
		btnNewButton_1.setBounds(35, 120, 183, 23);
		contentPane.add(btnNewButton_1);
		
		
	}
}`];
var boost=1;
var valorclick=1;
//Adiciona pontos ao clicar na imagem do computador
$('#Pczinho').on('click', function() {
	pontuacao=pontuacao+(valorclick*boost);
	pontuacaoAcumulada=pontuacaoAcumulada+(valorclick*boost);
	$('#pontuacao').text('Pontuação: '+pontuacao);
	escreverCodigo();
});
//Escreve algum codigo na tela baseado na pontuacao total
function escreverCodigo() {
	if(codigo[qualCodigo].length>pontuacaoAcumulada){
		$(".java").text(codigo[qualCodigo].slice(0,pontuacaoAcumulada));
	}
	else{
		pontuacaoAcumulada=0;
		if(qualCodigo===0){
			qualCodigo=1;
		}
		else{
			qualCodigo=0;
		}
		$(".java").text(codigo[qualCodigo].slice(0,pontuacaoAcumulada));
	}
	hljs.initHighlighting.called = false;
	hljs.initHighlighting();
}
//Anima o gif do computador quandos passamos o mouse por cima dele
$("#Pczinho").mouseover(function() {
	$('#Pczinho').attr('src',"PixelArts/Pczinho.gif");
});
//Para a animacao do gif do computador quando tiramos o mouse de cima dele
$("#Pczinho").mouseout(function() {
	$('#Pczinho').attr('src','PixelArts/Pczinho_frame_zero.gif');
	$('#Pczinho').stop(true,true);
});


var perguntasQuiz=[
	'Termo utilizado para criar uma estrutura de repetição em Java:',
	'Qual dessas linguagens não é uma linguagem de programação?'
];
var qualResposta=[0,3];
var respostasQuiz=[
	['while','if','switch','else'],
	['JavaScript','Phyton','C','HTML']

];
//Essa funcao faz aparecer um quiz que aumenta a producao de pontos caso o acertemos
setTimeout(function() {
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
},5);
var iniciar;

var ia=0;
var custoIa=15;
var upgradeIa=1;
var quantidadeUpgradeIa=0;
var producaoIa=0;
//Funcao para comprar a Ia
var upgradeIaComprado=true;
$('#comprarIa').on('click', function(){
	
	if(pontuacao>=custoIa){
		ia+=1;
		var imgIa = $('<img class="itemImg">');
		imgIa.attr('src','PixelArts/BAS_IA.gif');
		imgIa.appendTo('#arquivos');
		pontuacao=pontuacao-custoIa;
		$('#pontuacao').text(pontuacao);
		if(ia>=(5*(quantidadeUpgradeIa))){
			if(upgradeIaComprado){
				upgradeIaComprado=false;
			quantidadeUpgradeIa++;
			$('#upgrade').append('<img src="PixelArts/BAS_IA.gif" alt="melhorar Ia" data-toggle="tooltip" title="Aumentar Produção das Ias e clique em 100%. Custo: '+100*Math.pow(5,(quantidadeUpgradeIa-1))+' "data-placement="left"class="imgUpgradeIa" id='+quantidadeUpgradeIa+'>');
			}
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoIa=producaoIa+(0.1*upgradeIa);
		ps=ps+(0.1*upgradeIa);
		$('#ps').text('Pontuação por segundo: '+ps);
		$('#quantidadeIas').text('Quantidade de Ias: '+ia);
	}
	custoIa=Math.round(15*Math.pow(1.13,ia));
	$('#custoIa').text('Custo Ia: '+custoIa);
});
//Funcao para melhorar a Ia
$(document).on('click','.imgUpgradeIa', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(100*Math.pow(10,(id-1)))){
		upgradeIaComprado=true;
		 $('.imgUpgradeIa#'+id).remove();
		pontuacao-=100*Math.pow(5,(id-1));
		$('#pontuacao').text(pontuacao);
		 upgradeIa=upgradeIa*2;
		 valorclick=valorclick*2;
		 ps-=producaoIa;
		 producaoIa=producaoIa*2;
		 $("#comprarIa").prop('title','produção por segundo='+(0.1*upgradeIa));
		 ps+=producaoIa;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});
var programadores=0;
var custoProgramador=100;
var producaoProgramador=0;
var upgradeprogramador=1;
var quantidadeupgradeprogramador=0;
//Funcao para comprar o programador
var upgradeProgramadorComprado=true;
$('#comprarProgramador').on('click', function(){
	
	if(pontuacao>=custoProgramador){
		programadores+=1;
		var imgProgramador = $('<img class="itemImg">');
		imgProgramador.attr('src','PixelArts/BAS_Programador.png');
		imgProgramador.appendTo('#arquivos');
		pontuacao=pontuacao-custoProgramador;
		$('#pontuacao').text(pontuacao);
		if(programadores>=(5*(quantidadeupgradeprogramador))){
			if(upgradeProgramadorComprado){
				upgradeProgramadorComprado=false;
			quantidadeupgradeprogramador++;
			
			$('#upgrade').append('<img src="PixelArts\\Comp_Programador.png" alt="melhorar programador" data-toggle="tooltip" title="Aumentar Produção dos programadores em 100%. Custo: '+1000*Math.pow(5,(quantidadeupgradeprogramador-1))+' "data-placement="left"class="imgupgradeprogramador" id='+quantidadeupgradeprogramador+'>');
			}
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoProgramador=producaoProgramador+(1*upgradeprogramador);
		ps=ps+(1*upgradeprogramador);
		$('#ps').text('Pontuação por segundo: '+ps);
		$('#quantidadeProgramadores').text('Quantidade de Programadores: '+programadores);
	}
	custoProgramador=Math.round(100*Math.pow(1.13,programadores));
	$('#custoProgramadores').text('Custo Programadores: '+custoProgramador);
});
//Funcao para melhorar os programadores
$(document).on('click','.imgupgradeprogramador', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(1000*Math.pow(5,(id-1)))){
		upgradeProgramadorComprado=true;
		 $('.imgupgradeprogramador#'+id).remove();
		pontuacao-=1000*Math.pow(5,(id-1));
		$('#pontuacao').text(pontuacao);
		 upgradeprogramador=upgradeprogramador*2;
		 ps-=producaoProgramador;
		 producaoProgramador=producaoProgramador*2;
		 $("#comprarProgramador").prop('title','produção por segundo='+(1*upgradeprogramador));
		 ps+=producaoProgramador;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});
var karem=0;
var custoKarem=1100;
var upgradeKarem=1;
var quantidadeUpgradeKarem=0;
var producaoKarem=0;
//Funcao para comprar a Karem (Robotrom)
var upgradeKaremComprado=true;
$('#comprarKarem').on('click', function(){
	
	if(pontuacao>=custoKarem){
		karem+=1;
		var imgKarem = $('<img class="itemImg">');
		imgKarem.attr('src','PixelArts/BAS_Karen.gif');
		imgKarem.appendTo('#arquivos');
		pontuacao=pontuacao-custoKarem;
		$('#pontuacao').text(pontuacao);
		if(karem>=(5*(quantidadeUpgradeKarem))){
			if(upgradeKaremComprado){
				upgradeKaremComprado=false;
			quantidadeUpgradeKarem++;
			$('#upgrade').append('<img src="PixelArts/BAS_Karen.gif" alt="melhorar Robotrom" data-toggle="tooltip" title="Aumentar Produção dos Robotrons em 100%. Custo: '+11000*Math.pow(5,(quantidadeUpgradeKarem-1))+' "data-placement="left"class="imgUpgradeKarem" id='+quantidadeUpgradeKarem+'>');
			}
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoKarem=producaoKarem+(8*upgradeKarem);
		ps=ps+(8*upgradeKarem);
		$('#ps').text('Pontuação por segundo: '+ps);
		$('#quantidadeKarens').text('Quantidade de Robotrons: '+karem);
	}
	custoKarem=Math.round(1100*Math.pow(1.13,karem));
	$('#custoKarem').text('Custo Robotrom: '+custoKarem);
});
//Funcao para melhorar a Karem (Robotrom)
$(document).on('click','.imgUpgradeKarem', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(11000*Math.pow(5,(id-1)))){
		upgradeKaremComprado=true;
		 $('.imgUpgradeKarem#'+id).remove();
		pontuacao-=11000*Math.pow(5,(id-1));
		$('#pontuacao').text(pontuacao); 
		
		 upgradeKarem=upgradeKarem*2;
		 $("#comprarKarem").prop('title','produção por segundo='+(8*upgradeKarem));
		 ps-=producaoKarem;
		 producaoKarem=producaoKarem*2;

		 ps+=producaoKarem;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});

var alien=0;
var custoAlien=130000;
var upgradeAlien=1;
var quantidadeUpgradeAlien=0;
var producaoAlien=0;
//Funcao para comprar o Alien
var upgradeAlienComprado=true;
$('#comprarAlien').on('click', function(){
	
	if(pontuacao>=custoAlien){
		alien+=1;
		var imgAlien = $('<img class="itemImg">');
		imgAlien.attr('src','PixelArts/BAS_Alien.gif');
		imgAlien.appendTo('#arquivos');
		pontuacao=pontuacao-custoAlien;
		$('#pontuacao').text(pontuacao);
		if(alien>=(5*(quantidadeUpgradeAlien))){
			if(upgradeAlienComprado){
				upgradeAlienComprado=false;
			quantidadeUpgradeAlien++;
			$('#upgrade').append('<img src="PixelArts/BAS_Alien.gif" alt="melhorar Alienígena" data-toggle="tooltip" title="Aumentar Produção dos Alienígenas em 100%. Custo: '+1300000*Math.pow(5,(quantidadeUpgradeAlien-1))+' "data-placement="left"class="imgUpgradeAlien" id='+quantidadeUpgradeAlien+'>');
			}
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoAlien=producaoAlien+(260*upgradeAlien);
		ps=ps+(260*upgradeAlien);
		$('#ps').text('Pontuação por segundo: '+ps);
		$('#quantidadeAliens').text('Quantidade de Alienígenas: '+alien);
	}
	custoAlien=Math.round(130000*Math.pow(1.13,alien));
	$('#custoALien').text('Custo Alien: '+custoAlien);
});
//Funcao para melhorar o alien
$(document).on('click','.imgUpgradeAlien', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(1300000*Math.pow(5,(id-1)))){
		upgradeAlienComprado=true;
		 $('.imgUpgradeAlien#'+id).remove();
		pontuacao-=1300000*Math.pow(5,(id-1));
		$('#pontuacao').text(pontuacao);
		 upgradeAlien=upgradeAlien*2;
		 ps-=producaoAlien;
		 producaoAlien=producaoAlien*2;
		 $("#comprarAlien").prop('title','produção por segundo='+(260*upgradeAlien));
		 ps+=producaoAlien;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});
var wanghley=0;
var custoWanghley=1400000;
var upgradeWanghley=1;
var quantidadeUpgradeWanghley=0;
var producaoWanghley=0;
//Funcao para comprar o Deus da programação
var upgradeWanghleyComprado=true;
$('#comprarWanghley').on('click', function(){
	
	if(pontuacao>=custoWanghley){
		wanghley+=1;
		var imgWanghley = $('<img class="itemImg">');
		imgWanghley.attr('src','PixelArts/BAS_deus da programação.png');
		imgWanghley.appendTo('#arquivos');
		pontuacao=pontuacao-custoWanghley;
		$('#pontuacao').text(pontuacao);
		if(wanghley>=(5*(quantidadeUpgradeWanghley))){
			if(upgradeWanghleyComprado){
				upgradeWanghleyomprado=false;
			quantidadeUpgradeWanghley++;
			$('#upgrade').append('<img src="PixelArts/BAS_deus da programação.png" alt="melhorar Deus da Programação" data-toggle="tooltip" title="Aumentar Produção dos Deuses da Programação em 100%. Custo: '+14000000*Math.pow(5,(quantidadeUpgradeWanghley-1))+' "data-placement="left"class="imgUpgradeWanghley" id='+quantidadeUpgradeWanghley+'>');
			}
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoWanghley=producaoWanghley+(1400*upgradeWanghley);
		ps=ps+(1400*upgradeWanghley);
		$('#ps').text('Pontuação por segundo: '+ps);
		$('#quantidadeWanghley').text('Quantidade de Deuses da Programação: '+wanghley);
	}
	custoWanghley=Math.round(1400000*Math.pow(1.13,wanghley));
	$('#custoWanghley').text('Custo Deus da programação: '+custoWanghley);
});
//Funcao para melhorar o Deus da Programação
$(document).on('click','.imgUpgradeWanghley', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(14000000*Math.pow(5,(id-1)))){
		upgradeWanghleyComprado=true;
		 $('.imgUpgradeWanghley#'+id).remove();
		pontuacao-=14000000*Math.pow(5,(id-1));
		$('#pontuacao').text(pontuacao);
		 upgradeWanghley=upgradeWanghley*2;
		 ps-=producaoWanghley;
		 producaoWanghley=producaoWanghley*2;
		 $("#comprarWanghley").prop('title','produção por segundo='+(1400*upgradeWanghley));
		 ps+=producaoWanghley;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});
	var psMaior20=false;
	//Funcao responsagel pela geracao de pontos
	function gerarPontos(){

		if(ps<20){
			pontuacao=pontuacao+(1*boost);
			pontuacaoAcumulada=pontuacaoAcumulada+(boost*1);
			$('#pontuacao').text('Pontuação: '+pontuacao);
			escreverCodigo();
			clearInterval(iniciar);
    		iniciar=setInterval(gerarPontos,(1000/ps));
		}
		else{
			
				clearInterval(iniciar);
				iniciar=setInterval(gerarPontos20,(50));
				psMaior20=true;
			
		}
	}
	//Variação da função acima para quando a pontuação poer segundo chegar a 20
	function gerarPontos20(){
		pontuacao=pontuacao+Math.round((ps*boost)/20);
			pontuacaoAcumulada=pontuacaoAcumulada+Math.round((ps*boost)/20);
			$('#pontuacao').text('Pontuação: '+pontuacao);

			escreverCodigo();
	}
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