
class Usuarios{
    constructor(){
        this.personas = []
    }


    agregarPersona(id, nombre, sala){
        let agregarP = {id, nombre, sala}

        this.personas.push(agregarP)

        return this.personas;
    }

    getPersona (id) {
        let usuario = this.personas.filter((persona) => persona.id === id)[0];
        
        if(!usuario){
            usuario = {
                id:'3242esdafsdadfsa',
                nombre: 'No existe'
            }
        }
        return usuario.nombre
    }

    getAllPersonas(){
        return this.personas;
    }

    getPersonaPorSala(sala){
        let personas = this.personas.filter(persona => persona.sala === sala);

        return personas
    }

    removePersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter((persona) => persona.id != id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}