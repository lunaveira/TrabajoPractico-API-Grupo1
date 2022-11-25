var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var contratacionSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clases"
    }, 
    motivo: String,
    horarioReferencia: String,
    status: String, // 'Aceptada' 'Solicitada' 'Cancelada' 'Finalizada'
    email: String,
    telefono: Number,
    horario: String

})

contratacionSchema.plugin(mongoosePaginate)
const Contratacion = mongoose.model('contrataciones', contratacionSchema)

module.exports = Contratacion;