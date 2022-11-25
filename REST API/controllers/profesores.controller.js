var ProfeService = require('../services/profesores.service');
var ProfeImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getProfesores = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Profes = await ProfeService.getProfes({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Profes, message: "Succesfully Profes Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getProfesByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    try {
        var Profes = await ProfeService.getProfesores(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Profes, message: "Succesfully profes Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createProfesor = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Profe = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProfe = await ProfeService.createUser(Profe)
        return res.status(201).json({createdProfe, message: "Succesfully Created Profe"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "no se creo el profesor"})
    }
}

exports.updateProfe = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Profe = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    try {
        var updatedProfe = await ProfeService.updateProfe(Profe)
        return res.status(200).json({status: 200, data: updatedProfe, message: "Succesfully Updated Profesor"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeProfe = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await ProfeService.deleteProfe(id);
        res.status(200).send("Succesfully Deleted Profesor");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginProfe = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var Profe = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginProfe = await ProfeService.loginProfe(Profe);
        if (loginProfe===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.guardarImagenProfe = async function (req, res) {

    console.log("ImgProfe",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let ProfeImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (ProfeImg.nombreImagen!=='')
        {
            var newProfeImg = await ProfeImgService.createUserImg(ProfeImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenProfeByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var ProfesImg = await ProfeImgService.getImagenesByUser(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log("ProfeByDni",ProfesImg)
        if (ProfesImg.total===0)
            return res.status(201).json({status: 201, data: ProfesImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: ProfesImg, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}
    
    
