var express = require('express')
var router = express.Router()
var ComentarioController = require('../controllers/comentarios.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/crearComentario', ComentarioController.comentarClase)
router.post('/login/', UserController.loginUser)
router.get('/',Authorization, ComentarioController.getComentariosTotales)
router.post('/comentarioByUser', Authorization, ComentarioController.getComentarioByUser)
router.delete('/:id', Authorization, ComentarioController.bloquearComentario)




