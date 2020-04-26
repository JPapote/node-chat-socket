var socket = io();

var params = new URLSearchParams(window.location.search)

console.log(params.has('nombre'))
if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('The name is necesary and thhe sala')
}

 var data = {
    nombre : params.get('nombre'),
    sala : params.get('sala')
 }
socket.on('connect', function() {
    console.log('Conectado al servidor')

    socket.emit('crearMensaje', {
        nombre: 'papote',
        mensaje: 'HOla Javi'
    })

    socket.emit('entrarChat', data, function (resp){
        console.log(resp)
       
    })
    socket.on('entrarChat', function (resp) {
        console.log(resp)
    })
    socket.on('msjPrivado', function (resp) {
        console.log(resp)
    })

    socket.on('salirChat', function(eliminado) {
        console.log(eliminado)
    })


});


socket.on('disconnect', function() {
    console.log('Desconectado');
})


