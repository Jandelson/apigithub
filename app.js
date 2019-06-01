/**
 * mapeando DOM
 */
var app = document.querySelector('#app');
/**
 * Criando elementos
 */
var input = document.createElement('input');
input.setAttribute('placeholder', 'Usuario github');

var btn = document.createElement('button');
var btnText = document.createTextNode('Buscar Usuario');
btn.appendChild(btnText);

var ul = document.createElement('ul');

var imgElement = document.createElement('img');

/**
 * Atribuindo elementos criados a tela do html
 */
app.appendChild(imgElement);
app.append(ul);
app.appendChild(input);
app.appendChild(btn);

var inputElement = document.querySelector('#app input');
/**
 * Buscar usuário consumindo a api do github
 */
function buscaUsuario() {
    var nome = inputElement.value;
    if(nome === '') {
        alert('Informe um usuario!');
        inputElement.focus();
        return false;
    }
    axios.get('https://api.github.com/users/'+nome+'')
    .then(function(response){
        mostraAvatar(response.data.avatar_url);
        axios.get(response.data.repos_url)
        .then(function(response){
            addLista(response.data);
        })
        .catch(function(error){
            console.warn(error)
        });
    })
    .catch(function(error){
        alert('Usuario não encontrado!');
        console.warn(error)
    });
}
/**
 * Listar repositórios
 * @param {*} repos 
 */
function addLista(repos) {
    ul.innerHTML = '';
    if (repos.length === 0 ) {
        alert('Não existem repositórios!');
        return false;
    }
    renderLoading();
    for(repositorios of repos) {
        var liElement = document.createElement('li');
        var liText = document.createTextNode(repositorios.name);
        liElement.appendChild(liText);
        ul.appendChild(liElement);
    }
}
/**
 * Mostrar avatar
 * @param {*} avatar 
 */
function mostraAvatar(avatar) {
    imgElement.setAttribute('src', '');
    imgElement.setAttribute('src', avatar);
}

function renderLoading(loading) {
    ul.innerHTML = "";
    var textElement = document.createTextNode('Carregando...');
    var loadingElement = document.createElement('li');
    loadingElement.appendChild(textElement);
    ul.appendChild(loadingElement);
}


btn.onclick = buscaUsuario;