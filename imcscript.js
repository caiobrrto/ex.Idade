// Algoritmo

// CalcularIMC
// 1. pegar os valores
// 2. calcular o imc
// 3. gerar a classificação do imc
// 4. organizar as informações 
// 5. salvar os dados na lista
// 6. ler a lista com dados 
// 7. renderizar o conteudo no html
// 8. botão de limpar os registros


// Função Principal
function calcularImc(event) {
    event.preventDefault()
    console.log("Funcionante!");

    let dadosUsuario = pegarValores();

    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

    let classificacaoImc = classificarImc(imc);

    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacaoImc);

    cadastrarUsuario(usuarioAtualizado);
}

// passo 1- pegar os valores

function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebida = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value);

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

// passo 2 - calcular

function calcular(altura, peso) {
    let imc = peso / (altura * altura)

    console.log(imc);

    return imc;
}

// passo 3 - classificar

function classificarImc(imc) {

    /*
    Resultado               Situação
    Abaixo de 18,5          Abaixo do peso
    Entre 18,5 e 24,99      Normal
    Entre 25 e 29,99        Acima do Peso
    Acima de 30             Obesidade
    */

    if (imc < 18.5) {
        return "Abaixo do peso."
    } else if (imc < 25) {
        return "Peso Normal."
    } else if (imc < 30) {
        return "Acima do peso."
    } else {
        return "Obesidade."
    }
}

// passo 4 - organizar as informações

function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacao: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}

// passo 5 - salvar os dados na lista

function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados") == true) { 
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario);

    localStorage.getItem("usuariosCadastrados", JSON.stringify(listaUsuarios));
}

// passo 6 - ler a lista com dados

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.lenght == 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usúario cadastrado!</td>
    </tr>`

    } else {
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

// passo 7 -  montar tabela

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById('corpo-tabela');

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="altura">${pessoa.altura}</td>
        <td data-cell="peso">${pessoa.peso}</td>
        <td data-cell="valor do IMC">${pessoa.imc}</td>
        <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
        <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
    </tr>`

    });

    tabela.innerHTML = template;
}

// passo 8 - limpar local storage

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload();
}

