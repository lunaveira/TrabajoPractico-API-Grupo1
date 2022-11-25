var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InfoAlumnoSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fechaNac: Date,
    estudiosCursados: [String]
})

InfoAlumnoSchema.plugin(mongoosePaginate)
const InfoAlumno = mongoose.model('InfoAlumno', InfoAlumnoSchema)

module.exports = InfoAlumno;
