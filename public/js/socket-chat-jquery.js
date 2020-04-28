var socket = io();
var params = new URLSearchParams(window.location.search);


var nombre = params.get('nombre');
var sala = params.get('sala');

var divChatBox = $('#divChatbox')
var divUsuarios = $('#divUsuarios');
var inputText = $('#inputText');
var formText = $('#formText');

function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '  <a href="javascript:void(0)" class = "active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';


    for (let i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a data-id=' + personas[i].id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html)

}

function renderizarMesaje(mensaje, yo) {
    var html = '';

    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes(); 


    if(yo){
        html += '  <li class="reverse">';
        html += '<div class="chat-content">';
        html +=  '  <h5>'+mensaje.nombre+'</h5> ';
        html +=  '<div class="box bg-light-inverse">'+mensaje.mensaje+' </div></div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />';
        html += '</div>';
        html +=  '<div class="chat-time">'+hora+'</div>';
        html += '</li>';
     
    }else {
        html += '<li class="animated fandeIn">';

        if(mensaje.nombre !== 'Administrador'){
            html += '<div class="chat-img><img src="assets/imagenes/users/5.jpg" alt="user"/></div></li>'
        }
        html += '<div class="chat-content">';
        html += '<h5>'+mensaje.nombre+'</h5>';
        html += '<div class="box bg-light-info">'+ mensaje.mensaje +'</div></div>';
        html += '<div class="chat-time">'+hora+'</div>';
        html += '</li>';
    
    
    }
    
 
    divChatBox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


divUsuarios.on('click', 'a', function () {

    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }

})
formText.on('submit', function (e) {
    e.preventDefault();

    if (inputText.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        sala: sala,
        mensaje: inputText.val()
    }, function (mensaje) {
        inputText.val('').focus()
        renderizarMesaje(mensaje, true)
        scrollBottom()
    });
})
