var express = require('express');
var router = express.Router()
var ClasesController = require('../controllers/clases.controller');
const authorization = require('../auth/authorization'); 
const authorizationAlumno = require('../auth/authorizationAlumno'); 
const authorizationProfesor = require('../auth/authorizationProfesor'); 

router.get('', authorization, ClasesController.getClases);
router.get('/alumno', authorizationAlumno, ClasesController.getClasesContradasPorAlumno);
router.get('/:id', authorization, ClasesController.getClaseById);
router.post('/',authorizationProfesor, ClasesController.createClase);
router.delete('/:idClase',authorizationProfesor, ClasesController.deleteClase);
router.put('/:idClase', authorizationProfesor, ClasesController.updateClase);
router.post('/:idClase/publicar', authorizationProfesor, ClasesController.publicarClase);
router.post('/:idClase/despublicar', authorizationProfesor, ClasesController.despublicarClase);


// Export the Router
module.exports = router;
