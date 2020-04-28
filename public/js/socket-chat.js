var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        
        renderizarUsuarios(resp)
        
        
        // console.log('Usuarios conectados', resp);
    });

});
socket.on('entrarChat', function (resp) {
    renderizarMesaje(resp)
})

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// 

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMesaje(mensaje, false)
    console.log(mensaje)
    
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(resp) {
    renderizarUsuarios(resp)
    
});

socket.on('salirChat', function(resp){

    renderizarUsuarios(resp)
})
// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});