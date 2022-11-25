var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var clasesSchema = new mongoose.Schema({
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    nombre: String,
    frecuencia: String,
    costo: Number,
    duracion: Number,
    materia: String,
    coverPhoto: String,
    nameCoverPhoto: String,
    publicada: Boolean,
    alumnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    calificaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calificacion' }],
})

clasesSchema.plugin(mongoosePaginate)
const Clases = mongoose.model('clases', clasesSchema)

module.exports = Clases;