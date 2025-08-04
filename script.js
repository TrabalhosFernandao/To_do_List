const perguntas = [
    {
        pergunta: "Qual é o seu nome?",
        respostas: ["Marcelo", "Nicolas", "Casagrande", "Fernando"],
        correta: "Fernando"
    },
    {
        pergunta: "Qual é a formação do professor Fernando?",
        respostas: ["Doutor", "Tecnico", "Mestre", "Ensino medio"],
        correta: "Doutor"
    },
    {
        pergunta: "Qual o maior time do Brasil?",
        respostas: ["Internacional", "Palmeiras", "Corinthians", "São Paulo"],
        correta: "Internacional"
    },
    {
        pergunta: "Qual a melhor linguagem de programação?",
        respostas: ["Dart", "Js", "Java", "C"],
        correta: "Java"
    },
    {
        pergunta: "1+2",
        respostas: ["3", "4", "5", "6"],
        correta: "3"
    },{
        pergunta: "1*2",
        respostas: ["1", "2", "3", "345678"],
        correta: "2"
    }
];
localStorage.setItem('teste',JSON.stringify(perguntas));
palavras = JSON.parse(localStorage.getItem('teste'));
let indicePerguntaAtual = 0;
let pontuacao = 0;


const elementoPergunta = document.getElementById("pergunta");
const botoesResposta = document.querySelectorAll(".botao-resposta");
const botaoProximo = document.getElementById("botao-proximo");

const containerResultado = document.getElementById("resultado");

const elementoPontuacao = document.getElementById("pontuacao");


function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    botaoProximo.style.display = "none";
    containerResultado.style.display = "none";
    exibirPergunta();
   
}

function exibirPergunta() {
    resetarEstado(); 
    const perguntaAtual = perguntas[indicePerguntaAtual]; 
    elementoPergunta.innerText = perguntaAtual.pergunta;


    botoesResposta.forEach((botao, index) => {
        botao.innerText = perguntaAtual.respostas[index];
        botao.addEventListener("click", selecionarResposta); 
    });
}


function resetarEstado() {
    botaoProximo.style.display = "none"; 
    botoesResposta.forEach(botao => {
        botao.disabled = false; 
        botao.classList.remove("correto", "incorreto"); 
    });
}


function selecionarResposta(e) {
    const botaoSelecionado = e.target; 
    const respostaCorreta = botaoSelecionado.innerText === perguntas[indicePerguntaAtual].correta; 
    if (respostaCorreta) {
        botaoSelecionado.classList.add("correto"); 
        pontuacao++; 
    } else {
        botaoSelecionado.classList.add("incorreto"); 
    }
    localStorage.setItem('pont', JSON.stringify(pontuacao));
    exibirResultado();
    
    botoesResposta.forEach(botao => botao.disabled = true);

    botaoProximo.style.display = "block"; 
}


function exibirResultado() {
    containerResultado.style.display = "block";
    elementoPontuacao.innerText = `${pontuacao} de ${perguntas.length}`; 
}



botaoProximo.addEventListener("click", () => {
    indicePerguntaAtual++; 
    if (indicePerguntaAtual < perguntas.length) {
        exibirPergunta(); 
    } else {
        exibirResultado(); 
    }
});


iniciarQuiz();