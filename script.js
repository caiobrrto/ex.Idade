// FUNÇÃO PRINCIPAL
function calcularIdade(event) {
    event.preventDefault()
    console.log("Funcionante!")

    let dadosUsuario = pegarValores();

    let faixaEtaria = calcular(dadosUsuario.anoNasc, dadosUsuario.anoAtual)

    let classificEtaria = gerarFaixaEtaria(faixaEtaria)
    console.log(classificEtaria)

    let dadosUsuarioAtualizado = organizarDados(dadosUsuario, classificEtaria, faixaEtaria);
    cadastrarUsuario(dadosUsuarioAtualizado)

}


// 1. pegar os valores

function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let anoRecebido = parseFloat(document.getElementById("ano-nascimento").value);
    let anoAtualRecebido = new Date().getFullYear();

    let dadosUsuario = {

        nome: nomeRecebido,
        anoNasc: anoRecebido,
        anoAtual: anoAtualRecebido
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

// 2. calcular a idade

function calcular(anoNasc, anoAtual) {
    let faixaEtaria = anoAtual - anoNasc

    console.log(faixaEtaria);

    return faixaEtaria;
}

// 3. gerar a faixa etária

// Resultado            Faixa
// 0 à 12                Criança
// 13 à 17                Adolescente
// 18 à 65               Adulto
// Acima de 65         Idoso


function gerarFaixaEtaria(faixaEtaria) {
    if (faixaEtaria <= 12) {
        return "Criança"
    } else if (faixaEtaria <= 17) {
        return "Adolescente"
    } else if (faixaEtaria <= 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }
}

//4. Organizar o objeto pessoa para salvar na lista
function organizarDados(dadosUsuario, classificEtaria, faixaEtaria) {

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        faixaEtaria: faixaEtaria,
        classificEtaria: classificEtaria

    }

    console.log(dadosUsuarioAtualizado)

    return dadosUsuarioAtualizado
}

// 5. Cadastrar a pessoa na lista

function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario);

    localStorage.getItem("usuariosCadastrados", JSON.stringify(listaUsuarios));
}

// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página

function carregarUsuarios() {
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.lenght == 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `<tr class="linha-mensagem"><td colspan="6">Nenhum usúario cadastrado!</td>
        </tr>`

    }else{
        montarTabela(listaUsuarios)
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById('corpo-tabela');

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td ano-cell="ano">${pessoa.anoNasc}</td>
        <td data-cell="idade">${pessoa.faixaEtaria}</td>
        <td data-cell="faixa etária">${pessoa.gerarFaixaEtaria}</td>
    </tr>`

    });

    tabela.innerHTML = template;
    }