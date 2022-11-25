
var ClaseService = require('../services/clases.service');
var UserService = require('../services/user.service');


exports.getClases = async function(req,res){

    return res.status(200).send(await ClaseService.getClases())
}




exports.getClasesContradasPorAlumno = async function(req,res){

    const { userId } = req;

   
    if(!userId){
        return res.status(401).send({err: 'solo los alumnos pueden acceder'});
    }

    const userFound = await UserService.getUserById(userId);


    if(!userFound){
        return res.status(400).send({err: 'No encuentra user en BD'});
    }


    const contratacionesRealizadasPorElAlumno = await ContratacionesService.findByUserId(userId);

    const idClasesContratadas = contratacionesRealizadasPorElAlumno.map((contrtacion) => contrtacion.idClase)

    const clasesContratadasFound = await ClaseService.find({ idClase: idClasesContratadas  });


    clasesContratadasFound.forEach((clase) => {
        const contratacionActual = contratacionesRealizadasPorElAlumno.find(contratacion => contratacion.idClase === clase.id);
            clase.solicitada = true;
            clase.estado = contratacionActual.status;
    })

    return res.status(200).send(clasesFound)
}



exports.getClaseById = async function(req,res){

    const { userId } = req;

  
    if(!userId){
        return res.status(401).send({err: 'No autorizado'});
    }

    const userFound = await UserService.getUserById(userId);

    
    if(!userFound){
        return res.status(400).send({err: 'No encuentra user en BD'});
    }

    const { id } = req.params;

    const claseFound = await ClaseService.findById(id);


   if(!claseFound){
        return res.status(400).send({err: 'No encuentra la clase'});
    }

    return res.status(200).send(claseFound)
    
}



exports.createClase = async function(req,res){

    const { isProfesor, userId } = req;


    if(!isProfesor){
        return res.status(401).send({err: 'No autorizado'});
    }

    const userFound = await UserService.getUserById(userId);

    if(!userFound){
        return res.status(400).send({err: 'No encuentra user en BD'});
    }

    const { nombre, materia, duracion, frecuencia, costo } = req.body;
    
   
    if(!nombre || !materia || !duracion || !frecuencia || !costo ){
        return res.status(400).send({err: 'campos invalidos / incompletos'})
    }

    const nuevaClase = {
        nombre,
        materia,
        duracion,
        costo,
        frecuencia,
        profesor: userId,
        publicada: true
    }

    const nuevaClaseResponse = await ClaseService.createClase(nuevaClase);

    return res.status(200).send(await ClaseService.findById(nuevaClaseResponse._id));

    
}


exports.deleteClase = async function(req,res){

    const { isProfesor, userId } = req;


    if(!isProfesor){
        return res.status(401).send({err: 'No autorizado'});
    }

    const userFound = await UserService.getUserById(userId);

    if(!userFound){
        return res.status(400).send({err: 'No existe user en BD'});
    }

    const { idClase } = req.params;

    const claseFound = await ClaseService.findById(idClase);

  
    if(!claseFound){
        return res.status(400).send({err: 'no existe la clase'});
    }

    if(claseFound.profesor._id != userId){
        return res.status(401).send({err: 'Solo el profesor de esta clase puede eliminarla'});
    }

    const deleteClaseResponse = await ClaseService.deleteClase(idClase);

    return res.status(200).send(deleteClaseResponse);

    
}


exports.updateClase = async function(req,res){

    const { isProfesor, userId } = req;

  
    if(!isProfesor){
        return res.status(401).send({err: 'solo los profesores pueden acceder'});
    }

    const { nombre, materia, duracion, frecuencia, costo } = req.body;
        
    
    if(!nombre || !materia || !duracion || !frecuencia || !costo ){
        return res.status(400).send({err: 'campos incompletos / invalidos'})
    }


    const userFound = await UserService.getUserById(userId);

     
    if(!userFound){
        return res.status(400).send({err: 'no existe el user en BD'});
    }

    const { idClase } = req.params;

    const claseFound = await ClaseService.findById(idClase);


    if(!claseFound){
        return res.status(400).send({err: 'no existe la clase'});
    }

    console.log(claseFound,userId)
    if(claseFound.profesor._id != userId){
        return res.status(401).send({err: 'solo el profesor de esta clase puede editarla'});
    }

    const editClase = {
        nombre,
        materia,
        duracion,
        costo,
        frecuencia,
        publicada: true
    }

    

    const editClaseResponse = await ClaseService.editClase(idClase, editClase);

    return res.status(200).send(await ClaseService.findById(idClase));

    
}



exports.publicarClase = async function(req,res){

    const { isProfesor, userId } = req;

    if(!isProfesor){
        return res.status(401).send({err: 'solo profesores pueden acceder'});
    }

    const userFound = await UserService.getUserById(userId);

  
    if(!userFound){
        return res.status(400).send({err: 'no existe user en BD'});
    }

    const { idClase } = req.params;

    const claseFound = await ClaseService.findById(idClase);

    
    if(!claseFound){
        return res.status(400).send({err: 'Bad Request'});
    }

    if(claseFound.profesor._id != userId){
        return res.status(401).send({err: 'solo el profesor de esta clase puede editarla'});
    }

  
    if(claseFound.publicada == true){
        return res.status(400).send({err: 'esta clase ya ha sido publicada'});
    }
    
    const editClaseResponse = await ClaseService.publicarClase(idClase);

    return res.status(200).send(editClaseResponse);

}


exports.despublicarClase = async function(req,res){

    const { isProfesor, userId } = req;

    
    if(!isProfesor){
        return res.status(401).send({err: 'solo profesores pueden acceder'});
    }

    const userFound = await UserService.getUserById(userId);

    if(!userFound){
        return res.status(400).send({err: 'no existe user en BD'});
    }

    const { idClase } = req.params;

    const claseFound = await ClaseService.findById(idClase);

    
    if(!claseFound){
        return res.status(400).send({err: 'no existe la clase'});
    }

    if(claseFound.profesor._id != userId){
        return res.status(401).send({err: 'solo el profesor de esta clase puede despublicarla'});
    }

   
    
    const editClaseResponse = await ClaseService.despublicarClase(idClase);

    return res.status(200).send(editClaseResponse);


    
}
