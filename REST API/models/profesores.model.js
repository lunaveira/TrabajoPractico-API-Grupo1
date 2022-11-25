var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var InfoProfesorSchema = new mongoose.Schema({
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    titulo: string,
    experiencia: string
})

InfoProfesorSchema.plugin(mongoosePaginate)
const InfoProfesor = mongoose.model('InfoProfesor', InfoProfesorSchema)

module.exports = InfoProfesor;




