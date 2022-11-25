/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
 var jwt = require('jsonwebtoken');
 const User = require('../models/User.model');
 
 var authorization = function (req, res, next) {
 
     var token = req.headers['x-access-token'];
     var msg = {auth: false, message: 'No token provided.'};
     if (!token)
     return res.status(500).send(msg);
 
     let sec = process.env.SECRET;
     //console.log("secret",sec)
     jwt.verify(token, sec, function (err, decoded) {
         var msg = {auth: false, message: 'Failed to authenticate token.'};
         if (err)
         res.status(500).send(msg);
         req.userId = decoded.id;
         req.isProfesor = true;
         next();
     });
 }
 
 module.exports = authorization;