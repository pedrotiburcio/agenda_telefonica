const form = document.getElementById('form-agenda');
const nomeContato = document.getElementById('nome-contato');
const telefoneContato = document.getElementById('tel-contato');
const corpoTabela = document.querySelector('tbody');
let contatos = [];
let telefones = [];
let linhas = [];

//Ao clicar em adicionar, inicia o processo de verificação de informações do usuário 
form.addEventListener('submit', function(e){
    e.preventDefault();
    verificaInformacoesContato();
});

// Verifica se o contato possui pelo menos um sobrenome (Ex: Pedro Araújo)
function verificaTamanhoNome(nomeContato){
    const nomeComoArray = nomeContato.split(' ');
    for(let i = 0; i < nomeComoArray.length; i++){
        //Caso o usuário digite "Pedro " a função removerá o espaço em branco e invalidará o nome
        if(nomeComoArray[1] == ''){
            let removeEspacoEmBranco = nomeComoArray.pop();
        }
    }
    return nomeComoArray.length >= 2;
}

// Verifica se o número do telefone possui pelo menos 8 dígitos
function verificaTamanhoTelefone(telefoneContato){
    const telefoneComoArray = telefoneContato.split('');
    return telefoneComoArray.length >= 8;
}

//Verifica se o nome do contato já existe
function existeNomeContato(){
    return contatos.includes(nomeContato.value);
}

//Verifica se o telefone do contato já existe
function existeTelefoneContato(){
    return telefones.includes(telefoneContato.value);
}

// Atualiza a tabela a cada inserção ou remoção de contato
function atualizaTabela(){
    // Remove todas as linhas
    for (child of corpoTabela.children){
        corpoTabela.removeChild(child);
    }
    // Ordena os contatos por ordem alfabética trazendo os nomes iniciados em minúsculo para a posição correta
    linhas.sort(function (a,b){
        let x = a.toUpperCase(), 
        y = b.toUpperCase();
        return x == y? 0 : x > y ? 1 : -1;
    });
    // Atribui os contatos atualizados e os insere na tabela
    let linhasTabela = '';
    for(let i = 0; i < linhas.length; i++){
        linhasTabela += linhas[i];
    }
    corpoTabela.innerHTML = linhasTabela;
}

// Verifica se as informações do contato são válidas e se o contato já existe
function verificaInformacoesContato(){
    if(verificaTamanhoNome(nomeContato.value) && verificaTamanhoTelefone(telefoneContato.value)){
        if(!existeNomeContato() && !existeTelefoneContato()){
            criaLinha(nomeContato.value, telefoneContato.value);
        }
        else {
            alert('O contato e/ou número de telefone já existe(m) na agenda. Tente novamente.');
        }
    }
    else{
        alert('O nome do contato deve possuir pelo menos um sobrenome e o telefone deve possuir pelo menos 8 dígitos. Tente novamente.');
    }
    nomeContato.value = '';
    telefoneContato.value = '';
}

// Cria uma linha com as informações do contato
function criaLinha(nomeContato,telefoneContato){
    let linha = '<tr>';
    linha += `<td>${nomeContato}</td>`;
    linha += `<td>${telefoneContato}</td>`;
    linha += '<td><button type="submit" class="btn-remove">-</button></td>';
    linha += '</tr>';
    adicionaLinha(linha);
}

// Adiciona o contato a lista de contatos. Caso o contato já exista na lista, emite uma mensagem de alerta.
function adicionaLinha(linha){
    if(!contatos.includes(nomeContato)){
        linhas.push(linha);
        contatos.push(nomeContato.value)
        telefones.push(telefoneContato.value)
    }
    else{
        alert('O contato já está na sua agenda telefônica.');
    }
    atualizaTabela();
}

//Ao clicar no botão remover, remove o usuário
corpoTabela.addEventListener('click', function(e){
    let elementoClicado = e.target;
    // Transforma uma linha do tipo object em string
    let linhaARemover = '<tr>' + String(elementoClicado.parentNode.parentNode.innerHTML) + '</tr>'
    removeLinha(linhaARemover);
});

// Remove a linha da tabela e remove o nome e telefone do contato das listas de nomes e telefones, respectivamente
function removeLinha(linha){
    for(let i = 0; i < linhas.length; i++){
        if(linhas[i] == linha){
            linhas.splice(i, 1);
            contatos.splice(i,1);
            telefones.splice(i,1);
            atualizaTabela();
        }
    }
}