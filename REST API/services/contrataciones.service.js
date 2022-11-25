const Contratacion = require("../models/contrataciones.model")

exports.getContratacionesByAlumno = async function(id){
    return await Contratacion.find({alumno: id})
}

exports.createContratacion = async function(contratacion){

    try {
        const nuevaContratacion = new Contratacion({
            ...contratacion
        })
        return await nuevaContratacion.save()
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}