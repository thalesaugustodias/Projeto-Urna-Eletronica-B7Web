//Criando as variáveis, para pegar as informações do HTML e apenas declarar as mesmas, nas funções a seguir;

let seuVoto = document.querySelector('.left-1 span');//Variável que pega a informação do titulo "seu voto para";
let cargo = document.querySelector('.left-2 span'); //Variável que pega as informações de quem estamos votando
let desc = document.querySelector('.left-4'); //Variável que pega a descrição do candidato;
let aviso = document.querySelector('.d-2');//Variável que pega as informações de aviso;
let lateral = document.querySelector('.right'); //Variável que pega as informações laterais (foto do candidato);
let numeros = document.querySelector('.left-3'); //Variável que pega as informações do n° do candidato em tela.

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


function comecarEtapa() { //função onde está sendo iniciado os campos para os votos do candidato 
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) { //logica onde ira puxar a quantidade de numero no campo do candidato
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVoto.style.display = 'none'; //sumindo com as informações do titulo "seu voto para";
    cargo.innerHTML = etapa.titulo; //pegando o cargo do candidato e colocando de acordo com o Json;
    desc.innerHTML = '';//limpando as informações da descrição do candidato;
    aviso.style.display = 'none';//limpando as informações do aviso em tela;
    lateral.innerHTML = ''; //limpando as informações laterais (foto do candidato);
    numeros.innerHTML = numeroHtml; //Limpando as informações do números digitados;
}

function atualizaInterface() { //Função de atualização da interface após digitar os números do candidato.
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) { //Quando digitar as informações do n° do candidato que está no Json aparecer os dados do mesmo;
        candidato = candidato[0];
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = `Nome: ${candidato.nome}<br/> Partido${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-image small"> <img src="images/${candidato.fotos[i].url}" alt="Presidente Luladão"/>${candidato.fotos[i].legenda} </div>`
            } else {
                fotosHtml += `<div class="d-image"> <img src="images/${candidato.fotos[i].url}" alt="Presidente Luladão"/>${candidato.fotos[i].legenda} </div>`
            }
        }
        lateral.innerHTML = fotosHtml;
    } else { // Caso não esteja dentro do Json o numero com os dados do candidato o voto será nulo.
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="voto-nulo-ouB pisca">VOTO NULO</div>';
    }

}

function clicou(n) { //Função de digitação dos números;
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() { //Função para executar voto em branco!
    numero = '';
        votoBranco = true;
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        desc.innerHTML = '<div class="voto-nulo-ouB pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
}
function corrige() { //Botão de corrige;
    comecarEtapa();
}

function confirma() { //Botão de confirmar;
    let etapa = etapas[etapaAtual];
    let confirmado = false;

    if (votoBranco === true) { //Qnd o voto for branco;
        confirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        confirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (confirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML=
            '<div class="aviso-giga pisca">FIM<div/>'
            console.log(votos);
        }
    }
}
comecarEtapa();