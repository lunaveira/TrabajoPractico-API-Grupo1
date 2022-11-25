var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var comentariosSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clases"
    }, 
    comentario: String,
    habilitado: Boolean,
    motivoRechazo: String,
}, { timestamps: true } )

comentariosSchema.plugin(mongoosePaginate)
const Comentarios = mongoose.model('comentarios', comentariosSchema)

module.exports = Comentarios;