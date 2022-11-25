// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { ROL_USER } = require('../const/constantes');



exports.createUser = async function ({ name, email, password, rol, telefono }) {

    try {
        // Check Parameters

        console.log(name , email, password, rol , telefono)

        if (!name || !email || !password || !rol || !telefono) {
            throw new Error("Bad Params")
        }

        const rolLowerCase = rol.toLowerCase();

        console.log(rolLowerCase)

        if (rolLowerCase !== ROL_USER.ALUMNO && rolLowerCase !== ROL_USER.PROFESOR) {
            throw new Error("Bad Params")
        }


       const checkExistUser = await User.findOne({email});
       if(checkExistUser){
        throw new Error("User already registered")
       }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            telefono,
            rol
        })

        // Saving the User 
        const savedUser = await newUser.save();

        // Generating token auto login
        const token = generateToken(savedUser.id)

        return token;

    } catch (e) {

        console.log(e)
        throw Error("Error while Creating User")
    }
}


exports.loginUser = async function ({email, password}) {

    try{

        let userFound = await User.findOne({ email })
        if(!userFound) return null;
    
        var passwordIsValid = bcrypt.compareSync(password, userFound.password);
        if (!passwordIsValid) return null;
    
        const token = generateToken(userFound.id)
    
    
        return { token: token, user: userFound };
    }
    catch(err){
        throw Error("Internal Server Error")
    }

}


exports.getUserById = async function (id) {

    try{
        let userFound = await User.findById(id)
        if(!userFound) return null;
        return userFound;
    }
    catch(err){
        throw Error("Internal Server Error")
    }

}


const generateToken = (id) => {
    return  jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });
}
