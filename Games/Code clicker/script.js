var pontuacao=0;
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

var programadores=0;
var custoProgramador=15;
var producaoProgramador=0.0;
var iniciar;
var upgradeprogramador=1;
var quantidadeupgradeprogramador=0;
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
				setTimeout(function(){ boost=1; }, 60000);
				}
			$( this ).dialog( "close" );
		  }
	 
		},
		{
			text: respostasQuiz[qualPergunta][1],
			click: function() {
			  if(qualResposta[qualPergunta]===1){
				  boost=10;
				  setTimeout(function(){ boost=1; }, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[qualPergunta][2],
			click: function() {
			  if(qualResposta[qualPergunta]===2){
				  boost=10;
				  setTimeout(function(){ boost=1; }, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  },
		  {
			text: respostasQuiz[qualPergunta][3],
			click: function() {
			  if(qualResposta[qualPergunta]===3){
				  boost=10;
				  setTimeout(function(){ boost=1; }, 60000);
				  }
			  $( this ).dialog( "close" );
			}
	   
		  }
	  ]
	
  });
},5);
//Funcao para comprar o programador
$('#comprarProgramador').on('click', function(){
	
	if(pontuacao>=custoProgramador){
		programadores+=1;
		var imgProgramador = $('<img id="dynamic">');
		imgProgramador.attr('src','PixelArts/BAS_Programador.png');
		imgProgramador.appendTo('#arquivos');
		pontuacao=pontuacao-custoProgramador;
		$('#pontuacao').text(pontuacao);
		if(programadores>=(10*(quantidadeupgradeprogramador))){
			quantidadeupgradeprogramador++;
			$('#loja').append('<p class="upgradeprogramador" id='+quantidadeupgradeprogramador+'>Aumentar Produção dos programadores e mouse em 100%. Custo: '+100*Math.pow(5,(quantidadeupgradeprogramador-1))+'</p>');
			$('#loja').append('<img src="PixelArts\\Comp_Programador.png" alt="melhorar programador" class="imgupgradeprogramador" id='+quantidadeupgradeprogramador+'>');
		}
		if(ps===0.0){
			gerarPontos();
		}
		producaoProgramador=producaoProgramador+(0.1*upgradeprogramador);
		ps=ps+(0.1*upgradeprogramador);
		$('#ps').text('Pontuação por segundo'+ps.toFixed(1));
		$('#quantidadeProgramadores').text('Quantidade de Programadores: '+programadores);
	}
	custoProgramador=Math.round(15*Math.pow(1.12,programadores));
	$('#custoProgramadores').text('CustoProgramadores: '+custoProgramador);
});
//Funcao para melhorar os programadores
$(document).on('click','.imgupgradeprogramador', function(){
	var id = $(this).attr('id');
	
	if(pontuacao>=(100*Math.pow(2,(id-1)))){
		
		 $('.upgradeprogramador#'+id).remove();
		 $('.imgupgradeprogramador#'+id).remove();
		pontuacao-=100*Math.pow(2,(id-1));
		$('#pontuacao').text(pontuacao);
		 upgradeprogramador=upgradeprogramador*2;
		 valorclick=valorclick*2;
		 ps-=producaoProgramador;
		 producaoProgramador=producaoProgramador*2;

		 ps+=producaoProgramador;
		 $('#ps').text('Pontuação por segundo: '+ps.toFixed(1));
		 
	}
});
	var producaoProgramadorMaior20=false;
	//Funcao responsagel pela geracao de pontos dos programadores
	function gerarPontos(){

		if(producaoProgramador<20){
			pontuacao=pontuacao+(1*boost);
			pontuacaoAcumulada=pontuacaoAcumulada+(boost*1);
			$('#pontuacao').text('Pontuação: '+pontuacao);
			escreverCodigo();
			clearInterval(iniciar);
    		iniciar=setInterval(gerarPontos,(1000/ps));
		}
		else{
			if(!producaoProgramadorMaior20){
				clearInterval(iniciar);
				iniciar=setInterval(gerarPontos,(50));
				psMaior20=true;
			}
			pontuacao=pontuacao+Math.round((producaoProgramador*boost)/20);
			pontuacaoAcumulada=pontuacaoAcumulada+Math.round((producaoProgramador*boost)/20);
			$('#pontuacao').text('Pontuação: '+pontuacao);
			escreverCodigo();
		}
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

