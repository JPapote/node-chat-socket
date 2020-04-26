const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje}  = require('../utilidades/utilidades')
let usuario = new Usuarios();
io.on('connection', (client) => {

    client.on('crearMensaje', (data) => {
        let persona = usuario.getPersona(client.id);

        let mensaje = crearMensaje(persona, data.mensaje);
        client.broadcast.to(client.sala).emit('crearMensaje', {mensaje: crearMensaje(persona,`${mensaje} abandono el chat`)})


    })

    client.on('entrarChat', (data, callback) => {
        // console.log(nombre)

        if(!data.nombre || !data.sala){
            callback({
                err: true,
                mensaje: 'El nombre y la sala son necesarios'
            })
        }
        
        client.join(data.sala);
        let persona = usuario.agregarPersona(client.id, data.nombre, data.sala)
         let usuarioN= usuario.getPersona(client.id);
         let usuariosSalas = usuario.getPersonaPorSala(data.sala)
        client.broadcast.to(data.sala).emit('entrarChat', {mensaje:crearMensaje('Administrador',`${usuarioN} se a unido al chat`)})
        callback(usuariosSalas);

        client.on('disconnect', ()=> {
            let desconectado = usuario.removePersona(client.id);
            console.log();
             client.broadcast.to(data.sala).emit('salirChat', {mensaje: crearMensaje('Administrador',`${desconectado} abandono el chat`)})
        })

    })

    

    client.on('msjPrivado', data => {
        let privado = usuario.getPersona(client.id);
        client.broadcast.to(data.para).emit('msjPrivado', {mensaje: crearMensaje(`${privado}`, `${data.mensaje}`)})

    })

    
})
