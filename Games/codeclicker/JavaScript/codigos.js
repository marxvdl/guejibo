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
}`,`package sources;

import java.util.Scanner;

/**
 *
 * @author wanghley
 */
public class Code {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        Scanner in = new Scanner(System.in);
        float raio;
        System.out.print("Digite o valor do raio:");
        raio = in.nextFloat();
        System.out.printf("--------------------------------\n");
        float circun =(float) ((float) 2*(Math.PI)*raio);
        float area = (float) (Math.PI*(Math.pow(raio, 2)));
        System.out.println("Circunferência = "+circun);
        System.out.println("Área = "+area);
        System.out.printf("--------------------------------\n\n");
    }
    
}`,`import java.util.Random;

public class Q3 {

	public static void main(String[] args) {
		Random r= new Random();
		int n;
		int soma = 0;
		for(int x= 0;x<10;x++) {
			n=r.nextInt(1000);
			soma+=n;
			System.out.println(n);
		}
		System.out.println("Soma: "+soma);
		System.out.println("Media"+(soma/10));
	}

}
`,`public class Q5 {

	public static void main(String[] args) {
		for(int i=1; i<1000;i++) {
			for(int j=i; j>0;j--) {
				if(j==1) {
					System.out.println(i);
					break;
				}
				else if(i%j==0&&i!=j)
					break;
			}
		}

	}

}
`,`import java.util.Random;

public class Q4 {

	public static void main(String[] args) {
		Random r= new Random();
		int n[]=new int[10];
		n[0]=r.nextInt(1000);
		System.out.println(n[0]);
		int maior=n[0];
		int menor=n[0];
		for(int x=1;x<10;x++) {
			System.out.println(n[x]);
			n[x]=r.nextInt(1000);
			if(n[x]>n[x-1])
				maior=n[x];
			else if(n[x]<n[x-1])
				menor=n[x];
		}
		System.out.println("Maior número"+maior);
		System.out.println("Menor número"+menor);
	}

}
`,`public class Q6 {

	public static void main(String[] args) {
		long fibonacci[]=new long[50];
		fibonacci[0]=1;
		fibonacci[1]=1;
		System.out.println("1\n1");
		for(int x=2;x<50;x++) {
			fibonacci[x]=fibonacci[x-1]+fibonacci[x-2];
			System.out.println(fibonacci[x]);
		}

	}

}
`,`import java.util.*;

public class Q7 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Random r=new Random();
		Scanner t= new Scanner(System.in);
		int na=r.nextInt(101);
		int qtdc=0;
		while(true) {
			qtdc++;
			System.out.println("Digite um número");
			int nc= t.nextInt();
			if(nc==na) {
				System.out.println("Acertou\n Quantidade de tentativa: "+qtdc);
				break;
			}
		}
		t.close();
	}

}
`,`import javax.swing.JOptionPane;

public class Ex4 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String[] cotacao_dolar= new String[7];
		int media_cotacao=0;
		for(int x=0;x<7;x++) {
		cotacao_dolar[x]=JOptionPane.showInputDialog("Digite a cotação do dolar do dolar a "+(x+1)+" dias");
			int m= Integer.parseInt(cotacao_dolar[x]);
			media_cotacao=media_cotacao+m;
			if(x==6)
				JOptionPane.showMessageDialog(null,"A média da cotação do dolar da última semana é: "+(media_cotacao/7));
		}
	}

}
`,`
import javax.swing.JOptionPane;

public class Ex5 {
	public static void main(String[]args) {
		String numero=JOptionPane.showInputDialog(null,"Digite um número");
		int n=Integer.parseInt(numero);
		if(n%2==0)
			JOptionPane.showMessageDialog(null,"O número "+n+" é par");
		else
			JOptionPane.showMessageDialog(null,"O número "+n+" é impar");
		
	}
}
`,`
import javax.swing.JOptionPane;

public class Ex6 {

	public static void main(String[] args) {
			String numero1=JOptionPane.showInputDialog(null,"digite um número");
			int n1=Integer.parseInt(numero1);
			String numero2=JOptionPane.showInputDialog(null,"digite outro número");
			int n2=Integer.parseInt(numero2);
		if(n1>n2) {
			JOptionPane.showMessageDialog(null,n2);
			JOptionPane.showMessageDialog(null,n1);
		}else {
			JOptionPane.showMessageDialog(null,n1);
			JOptionPane.showMessageDialog(null,n2);
			
			
		}
	}

}
`,`import javax.swing.JOptionPane;

public class Ex3 {

	public static void main(String[] args) {
		String celsius=JOptionPane.showInputDialog(null,"Digite a temperatura em Celsius");
		int c= Integer.parseInt(celsius);
		int fahrenheit= 9*c/5+32;
		JOptionPane.showMessageDialog(null,"O valor convertido em Fahrenheit é: "+fahrenheit);

	}

}
`,`import javax.swing.JOptionPane;

public class Ex7 {

	public static void main(String[] args) {
		String numero1=JOptionPane.showInputDialog(null,"digite a base");
		int b=Integer.parseInt(numero1);
		String numero2=JOptionPane.showInputDialog(null,"digite o expoente");
		int e=Integer.parseInt(numero2);
		int potencia=b;
		for(int x=0;x<e-1;x++) {
			potencia=potencia*b;
			
		}
		JOptionPane.showMessageDialog(null, "potência="+potencia);
	}
}
`];
//Escreve algum codigo na tela baseado na pontuacao total
var pontuacaocodigo=0;
var qualCodigo=0;
var ordemcodigos=[];

for(var x=0; x<codigo.length;x++){
	ordemcodigos[x]=x;
}
//gera uma ordem aleatória para os códigos aparecerem no jogo
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

ordemcodigos = shuffle(ordemcodigos);
//escreve o codigo baseado na pontuacao atual
function escreverCodigo() {
	if(codigo[ordemcodigos[qualCodigo]].length>pontuacaoAcumulada){
		$(".java").text(codigo[ordemcodigos[qualCodigo]].slice(0,pontuacaoAcumulada));
	}
	else{
		pontuacaocodigo=0;
		
		if(qualCodigo<codigo.length){
			qualCodigo++;
		}
		else{
			qualCodigo=0;
			ordemcodigos= shuffle(ordemcodigos);
		}
		$(".java").text(codigo[ordemcodigos[qualCodigo]].slice(0,pontuacaocodigo));
	}
	hljs.initHighlighting.called = false;
	hljs.initHighlighting();
	if(upgradeClickComprado){
		if(pontuacaoAcumulada>=Math.pow(10,upgradeClick)*1000){
			upgradeClickComprado=false;
			$('#upgrade').append('<img src="PixelArts/button_teclado_frame_zero.gif" alt="melhorar clicque" data-toggle="tooltip" title="Aumentar valor do clique em 100%. Custo: '+(Math.pow(10,upgradeClick)*500)+' "data-placement="left"class="imgUpgradeClique" id='+upgradeClick+'>');
			upgradeClick++;
		}
	}
}
