var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');

var addButton = document.getElementById('addbutton')

addButton.addEventListener('click', function(e) { //addEventlistener = escutando um evento
    e.preventDefault();
    inserir(nameInput.value, ageInput.value);
})

function inserir(name, age){
    var data = { nome: name, idade: age}
    return firebase.database().ref().child('usuarios').push(data)
}