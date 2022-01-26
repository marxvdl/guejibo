let gc = new gameslib.GameConnection();

let numeroQues = document.querySelector('#numeroQues')
let letra = document.querySelector('#letra')
let dica = document.querySelector('#dica')
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')

let articleQuestoes = document.querySelector('.questoes')
let alternativas = document.querySelector('#opcoes')

let pontuacao= document.querySelector('#pontuacao')
let msgfinal = document.querySelector('#msgfinal')
let pontos = 0 //Pontos do placar
let placar = 0


const qst0 = {
    numeroQues  : 0,
    dica         : "dica",
    letra        : "letra",
    opcaoA       : "Opcao A",
    opcaoB       : "Opcao B",
    opcaoC       : "Opcao C",
    opcaoD       : "Opcao D",
    certa        : "0",
}

const qst1 = {
    numeroQues  : 1,
    dica         : "Indico a ação de beber, e estou no passado simples.",
    letra        : "Letra: D",
    opcaoA       : "DRANK",
    opcaoB       : "DRENK",
    opcaoC       : "DRINK",
    opcaoD       : "DRUNK",
    certa        : "DRANK",
}

const qst2 = {
    numeroQues   : 2,
    dica         : "Indico a ação de ir a algum lugar, e estou no passado simples.",
    letra        : "Letra: W",
    opcaoA       : "WANT",
    opcaoB       : "WENT",
    opcaoC       : "WONT",
    opcaoD       : "WYNT",
    certa        : "WENT",
}

 const qst3 = {
    numeroQues   : 3,
    dica         : "Indico a ação de tornar-se, e estou no particípio passado",
    letra        : "Letra: B",
    opcaoA       : "BECAME",
    opcaoB       : "BECEME",
    opcaoC       : "BECOME",
    opcaoD       : "BECEME",
    certa        : "BECOME",
}

const qst4 = {
    numeroQues   : 4,
    dica         : "Dica: Indico a ação de quebrar, e estou no passado simples.",
    letra        : "Letra: B",
    opcaoA       : "BROKE",
    opcaoB       : "BROKEN",
    opcaoC       : "BREAKE",
    opcaoD       : "BREAKED",
    certa        : "BROKE",
}


const qst5 = {
    numeroQues   : 5,
    dica         : "Dica: Indico a ação de pegar, e estou no passado simples.",
    letra        : "Letra: C",
    opcaoA       : "CAOGHT",
    opcaoB       : "COGHT",
    opcaoC       : "CAUGHT",
    opcaoD       : "CAUGH",
    certa        : "CAUGHT",
}
 
const qst6 = {
    numeroQues   : 6,
    dica         : "Dica: Indico a ação de cair, e estou no particípio passado.",
    letra        : "Letra: F",
    opcaoA       : "FELLEN",
    opcaoB       : "FALLEN",
    opcaoC       : "FALLENT",
    opcaoD       : "FALLED",
    certa        : "FALLEN",
}

const qst7 = {
    numeroQues   : 7,
    dica         : "Dica: Indico a ação de comer, e estou no passado simples.",
    letra        : "Letra: A",
    opcaoA       : "ATE",
    opcaoB       : "ATTE",
    opcaoC       : "EAT",
    opcaoD       : "EATED",
    certa        : "ATE",
}

const qst8 = {
    numeroQues   : 8,
    dica         : "Dica: Indico a ação de desenhar, e estou no passado simples.",
    letra        : "Letra: D",
    opcaoA       : "DREWED",
    opcaoB       : "DREW",
    opcaoC       : "DRAW",
    opcaoD       : "DROVE",
    certa        : "DREW",
}

const qst9 = {
    numeroQues   : 9,
    dica         : "Dica: Indico a ação de voar, e estou no passado simples.",
    letra        : "Letra: F",
    opcaoA       : "FLAW",
    opcaoB       : "FLOW",
    opcaoC       : "FLEWED",
    opcaoD       : "FLEW",
    certa        : "FLEW",
}

const qst10 = {
    numeroQues   : 10,
    dica         : "Dica: Indico a ação de cantar, e estou no passado simples.",
    letra        : "Letra: S",
    opcaoA       : "SING",
    opcaoB       : "SINGUED",
    opcaoC       : "SINGER",
    opcaoD       : "SANG",
    certa        : "SANG",
}

const questoes = [qst0, qst1, qst2, qst3, qst4, qst5, qst6, qst7, qst8, qst9, qst10]

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')

numero.textContent = qst1.numeroQues
let totalDeQuestoes = (questoes.length)-1
total.textContent = totalDeQuestoes

dica.textContent   = qst1.dica
letra.textContent   = qst1.letra
a.textContent = qst1.opcaoA
b.textContent = qst1.opcaoB
c.textContent = qst1.opcaoC
d.textContent = qst1.opcaoD

a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')
d.setAttribute('value', '1D')

function questaoSeguinte(nQuestao) {  
    numero.textContent = nQuestao
    dica.textContent   = questoes[nQuestao].dica
    letra.textContent   = questoes[nQuestao].letra
    a.textContent = questoes[nQuestao].opcaoA
    b.textContent = questoes[nQuestao].opcaoB
    c.textContent = questoes[nQuestao].opcaoC
    d.textContent = questoes[nQuestao].opcaoD
    a.setAttribute('value', nQuestao+'A')
    b.setAttribute('value', nQuestao+'B')
    c.setAttribute('value', nQuestao+'C')
    d.setAttribute('value', nQuestao+'D')

}


function conferirResposta(nQuestao, resposta) {

    let numeroDaQuestao = nQuestao.value
    let respostaEscolhida = resposta.textContent
    let correta = questoes[numeroDaQuestao].certa


    if(respostaEscolhida == correta) {
        Swal.fire({
            icon: 'success',
            title: 'Você acertou!! +10 pontos',
            showConfirmButton: false,
            timer: 1200
      })  

        pontos += 10 
        gc.sendScore(pontos)
    } else {

        Swal.fire({
            icon: 'error',
            title: 'Verbo errado! 🤔 -2 pontos',
            showConfirmButton: false,
            timer: 1200
      })
      pontos -= 2
      gc.sendScore(pontos)
    }

    placar = pontos
    pontuacao.textContent = placar 

    setTimeout(function() {
        proxima = numeroDaQuestao+1

        if(proxima > totalDeQuestoes) {

            Swal.fire({
                title: 'Você respondeu todas! Clique em STOP para encerrar o jogo.',
                showConfirmButton: true,
                timer: 10000
          }) 
          alternativas.style.pointerEvents = "none"; //desabilita alternativas
          bntStop.style.pointerEvents = "auto"; //habilita o botão Stop
            fimDoJogo()
        } else {
            questaoSeguinte(proxima)
            bntStop.style.pointerEvents = "none"; //desabilita o botão stop
        }
    }, 220)
}

let bntStop = document.querySelector("#bntStop")
bntStop.addEventListener("click", function fimDoJogo() {
    texto.textContent = ""
    pontos == 0 

    msgfinal.textContent = "Parabéns! Você ganhou " + pontos +" pontos"
    gc.sendScore(pontos, true)

    a.textContent = ""
    b.textContent = ""
    c.textContent = ""

    a.setAttribute('value', '0')
    b.setAttribute('value', '0')
    c.setAttribute('value', '0')

    bntStop.parentNode.removeChild( bntStop ); 
    moeda.parentNode.removeChild( moeda ); 
    pontuacao.parentNode.removeChild( pontuacao );
    numeracao.parentNode.removeChild(numeracao );  
    articleQuestoes.style.display = 'none' //retira o quadro das questões da tela final

    //criação do botão de jogar novamente
    function createButton()
{
     var btnReiniciar = document.createElement('BUTTON');
     btnReiniciar.id = 'reiniciar';
     var mensagem = document.createTextNode("PLAY AGAIN");        
     btnReiniciar.appendChild(mensagem);   
     btnReiniciar.onclick = function()
     {
        pontos = 0 
        location.reload();
    }
     document.body.appendChild(btnReiniciar);    
}

createButton();
//animacao da tela final
(function() {
    var canvas = this.__canvas = new fabric.Canvas('gameOver');
    fabric.Object.prototype.transparentCorners = true;
    var radius = 100;
  
    fabric.Image.fromURL('img/gameover.png', function(img) {
      img.scale(0.5).set({
        left: 870,
        top: 130,
        angle: 0,
        clipPath: new fabric.Circle({
          radius: radius,
          originX: 'center',
          originY: 'center',
        }),
      });
  
      (function animate() {
        fabric.util.animate({
          startValue: Math.round(radius) === 50 ? 50 : 500,
          endValue: Math.round(radius) === 50 ? 300 : 50,
          duration: 1000,
          onChange: function(value) {
            radius = value;
            img.clipPath.set('radius', value);
            img.set('dirty', true);
            canvas.renderAll();
          },
          onComplete: animate
        });
      })();
  
      canvas.add(img).setActiveObject(img);
    });
  })();
});
//fim da animação




