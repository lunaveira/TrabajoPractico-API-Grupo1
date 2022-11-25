var express = require('express')
var router = express.Router()
var ProfeController = require('../controllers/profesores.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/prueba', function(req, res) {
    res.send('Llegaste a la ruta de profesores');
  });
router.post('/registration', ProfeController.createProfesor)

router.post('/login/', ProfeController.loginProfe)
router.get('/',Authorization, ProfeController.getProfesores)
router.post('/userByMail', Authorization, ProfeController.getProfesByMail)
router.put('/', Authorization, ProfeController.updateProfe)
router.delete('/:id', Authorization, ProfeController.removeProfe)
router.post('/guardarImgUser',ProfeController.guardarImagenProfe)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/imgUserByMail',Authorization,ProfeController.getImagenProfeByMail)
router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;