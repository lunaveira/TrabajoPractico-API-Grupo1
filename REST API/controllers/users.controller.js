var UserService = require('../services/user.service');

exports.createUser = async function (req, res) {
    try {
        const { name, email, password, rol, telefono } = req.body;

        if (!name || !email || !password || !rol || !telefono) {
            return res.status(400).json({status: 400, message: "Bad Params"})
        }

        var createdUser = await UserService.createUser({name, email, password, rol, telefono})
        return res.status(201).json(createdUser)
    }
    catch(err){
        return res.status(500).json({status: 500, message: "No se pudo crear el usuario", info: err})
    }
}

exports.loginUser = async function (req, res) {

    try {

        const { email, password } = req.body;

        const loginUser = await UserService.loginUser({email, password});

        if(!loginUser){
            return res.status(401).json({status: 401, message: "Credenciales Incorrectas"})
        }

        return res.status(201).json(loginUser);


    } catch (err) {
        return res.status(500).json({status: 500, message: "Internal Server Error", info: err})
    }
}


exports.forgotPassword = async function (req, res) {

    try {

        const { email } = req.body;

        const recoverPwd = await UserService.recoverPassword({email});

        return res.status(201).json({status: 201, message: "Email sent"})


    } catch (e) {
        return res.status(500).json({status: 500, message: "Internal Server Error"})
    }
}
    
    
