/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
 var jwt = require('jsonwebtoken');
 const User = require('../models/User.model');

 var authorization = function (req, res, next) {
 
     var token = req.headers['x-access-token'];
     console.log("token",token);
     var msg = {auth: false, message: 'No token provided.'};
     if (!token)
         return res.status(500).send(msg);
 
     let sec = process.env.SECRET;
 
     jwt.verify(token, sec, async function (err, decoded) {
         var msg = {auth: false, message: 'Failed to authenticate token.'};
         if (err){
             return res.status(401).send(msg);
         }
         const id = decoded.id;
         const user = await User.findById(id);
         if(user && user.rol === 'alumno'){
             req.userId = decoded.id;
             req.isAlumno = true;
             next();
         }
         else{
             return res.status(401).send(msg);
         }
     });
 }
 
 module.exports = authorization;