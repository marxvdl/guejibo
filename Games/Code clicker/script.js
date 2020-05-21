var pontuacao=99999999999990;
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

var preco=[15,100,1100,12000,130000,1400000];
var quantidade=[0,0,0,0,0,0];
var upgrade=[1,1,1,1,1,1];
var quantidadeUpgrade=[0,0,0,0,0,0];
var quantoProduz=[0,0,0,0,0,0];
var producao=[0.1,1,8,47,260,1400];
var qualItem;
var upgradeComprado=[true,true,true,true,true,true];
$('#comprarIa').on('click', function(){
	qualItem=0;
	comprar();
});
$('#comprarProgramador').on('click', function(){
	qualItem=1;
	comprar();
});
$('#comprarKarem').on('click', function(){
	qualItem=2;
	comprar();
});
$('#comprarStartUp').on('click', function(){
	qualItem=3;
	comprar();
});
$('#comprarAlien').on('click', function(){
	qualItem=4;
	comprar();
});
$('#comprarWanghley').on('click', function(){
	qualItem=5;
	comprar();
});
function comprar(){
	if(pontuacao>=preco[qualItem]){
		preco[qualItem]=Math.floor(preco[qualItem]*1.13);
		quantidade[qualItem]++;
		pontuacao-=preco[qualItem];
		if(ps===0.0){
			gerarPontos();
		}
		quantoProduz[qualItem]+=producao[qualItem]*upgrade[qualItem];
		ps+=producao[qualItem]*upgrade[qualItem];
		
		$('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		switch(qualItem){
			case 0:
				var imgIa = $('<img class="itemImg">');
				imgIa.attr('src','PixelArts/BAS_IA.gif');
				imgIa.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_IA.gif" alt="melhorar Ia" data-toggle="tooltip" title="Aumentar Produção das Ias e clique em 100%. Custo: '+100*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeIa" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeIas').text('Quantidade de Ias: '+quantidade[qualItem]);
				$('#custoIa').text('Custo Ia: '+preco[qualItem]);
				break;
			case 1:
				var imgProgramador = $('<img class="itemImg">');
				imgProgramador.attr('src','PixelArts/BAS_Programador.png');
				imgProgramador.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/Comp_Programador.png" alt="melhorar programador" data-toggle="tooltip" title="Aumentar Produção dos programadores em 100%. Custo: '+1000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeProgramador" id='+quantidadeUpgrade[qualItem]+'>');}
				}
				$('#quantidadeProgramadores').text('Quantidade de Programadores: '+quantidade[qualItem]);
				$('#custoProgramadores').text('Custo Programador: '+preco[qualItem]);
				break;
			case 2:
				var imgKarem = $('<img class="itemImg">');
				imgKarem.attr('src','PixelArts/BAS_Karen.gif');
				imgKarem.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_Karen.gif" alt="melhorar Robotrom" data-toggle="tooltip" title="Aumentar Produção dos Robotrons em 100%. Custo: '+11000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeKarem" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeKarens').text('Quantidade de Robotrons: '+quantidade[qualItem]);
				$('#custoKarem').text('Custo Robotrom: '+preco[qualItem]);
				break;
			case 3:
				var imgStartUp = $('<img class="itemImg">');
				imgStartUp.attr('src','PixelArts/Terminal.gif');
				imgStartUp.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/Terminal.gif" alt="melhorar StartUp" data-toggle="tooltip" title="Aumentar Produção das StartUps em 100%. Custo: '+120000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeStartUp" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeStartUps').text('Quantidade de StartUps: '+quantidade[qualItem]);
				$('#custoStartUp').text('Custo StartUp: '+preco[qualItem]);
				break;
			case 4:
				var imgAlien = $('<img class="itemImg">');
				imgAlien.attr('src','PixelArts/BAS_Alien.gif');
				imgAlien.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_Alien.gif" alt="melhorar Alienígena" data-toggle="tooltip" title="Aumentar Produção dos Alienígenas em 100%. Custo: '+1300000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeAlien" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeAliens').text('Quantidade de Alienígenas: '+quantidade[qualItem]);
				$('#custoAlien').text('Custo Alienígena: '+preco[qualItem]);
				break;
			case 5:
				var imgWanghley = $('<img class="itemImg">');
				imgWanghley.attr('src','PixelArts/BAS_deus da programação.png');
				imgWanghley.appendTo('#arquivos');
				if(quantidade[qualItem]>=(5*(quantidadeUpgrade[qualItem]))){
					if(upgradeComprado[qualItem]){
						upgradeComprado[qualItem]=false;
						quantidadeUpgrade[qualItem]++;
						$('#upgrade').append('<img src="PixelArts/BAS_deus da programação.png" alt="melhorar Deus da Programação" data-toggle="tooltip" title="Aumentar Produção dos Deuses da Programação em 100%. Custo: '+14000000*Math.pow(5,(quantidadeUpgrade[qualItem]-1))+' "data-placement="left"class="imgUpgradeWanghley" id='+quantidadeUpgrade[qualItem]+'>');
					}
				}
				$('#quantidadeWanghley').text('Quantidade de deuses da Programação: '+quantidade[qualItem]);
				$('#custoWanghley').text('Custo Deus da Programação: '+preco[qualItem]);
				break;
		}
	}
};

var id;
var qualUpgrade;
$(document).on('click','.imgUpgradeIa', function(){
	qualUpgrade=0
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeProgramador', function(){
	qualUpgrade=1
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeKarem', function(){
	qualUpgrade=2
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeStartUp', function(){
	qualUpgrade=3
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeAlien', function(){
	qualUpgrade=4
	 id = $(this).attr('id');
	 fUpgrade();
});
$(document).on('click','.imgUpgradeWanghley', function(){
	qualUpgrade=5
	 id = $(this).attr('id');
	 fUpgrade();
});
var itens=['Ia','Programador','Karem','StartUp','Alien','Wanghley'];
var custoUpgrade= [100,1000,11000,120000,1300000,14000000];
//função para melhorar os itens
function fUpgrade(){
	if(pontuacao>=(custoUpgrade[qualUpgrade]*Math.pow(5,(id-1)))){
		upgradeComprado[qualUpgrade]=true;
		pontuacao-=custoUpgrade[qualUpgrade]*Math.pow(5,(id-1));
		upgrade[qualUpgrade]=upgrade[qualUpgrade]*2;
		ps-=quantoProduz[qualUpgrade];
		quantoProduz[qualUpgrade]=quantoProduz[qualUpgrade]*2;
		ps+=quantoProduz[qualUpgrade];
		$('.imgUpgrade'+itens[qualUpgrade]+'#'+id).remove();
		$('#pontuacao').text(pontuacao);
		$('#comprar'+itens[qualUpgrade]).prop('title','produção por segundo='+(producao[qualUpgrade]*upgrade[qualUpgrade]));
		$('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		if(qualUpgrade===0){
			valorclick=valorclick*2;
			$('#ppc').text('Pontos por clique: '+valorclick)
		}
	}
};
