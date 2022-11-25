var express = require('express');
var router = express.Router()
var ContratacionesController = require('../controllers/contrataciones.controller');

const authorizationAlumno = require('../auth/authorizationAlumno');


//Todas las clases
router.get('/byAlumno', authorizationAlumno, ContratacionesController.getClasesContrtadasPorAlumnos);


// creacion de la contratacion
router.post('', authorizationAlumno, ContratacionesController.contratarClases);



// Export the Router
module.exports = router;

