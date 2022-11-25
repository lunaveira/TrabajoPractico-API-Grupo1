


exports.comentarClase = async function(req,res){

    const { userId, isAlumno } = req;

    
    if(!userId || !isAlumno){
        return res.status(401).send({err: 'solo alumnos pueden comentar'});
    }

    const userFound = await UserService.findById(userId);

   
    if(!userFound){
        return res.status(400).send({err: 'no existe user en BD'});
    }

    const { idClase, comentario } = req.body;

    const claseFound = await ClaseService.findById(idClase);

   
    if(!claseFound){
        return res.status(400).send({err: 'no existe la clase '});
    }

    

    const checkContratacion =  await ContratacionService.findByAlumnoYClase(idClase, userId);

    if(!checkContratacion){
        return res.status(400).send({err: 'solo podes comentar tus clases contratadas'});
    }

    const nuevoComentario = {
        idUsuario: userId,
        idClase: idClase,
        comentario
    }

    const nuevoComentarioResponse = await ComentarioClaseService.createComentario(nuevoComentario);


    return res.status(200).send(nuevoComentarioResponse)
}



exports.rechazarComentario = async function(req,res){

    const { userId, isProfesor } = req;

  
    if(!userId || !isProfesor){
        return res.status(401).send({err: 'No autorizado'});
    }

    const userFound = await UserService.findById(userId);

   
    if(!userFound){
        return res.status(400).send({err: 'no existe user en BD'});
    }

    const { idComentario, motivo } = req.body;

    const comentarioFound = await ComentarioClaseService.findById(idComentario);

 
    if(!comentarioFound){
        return res.status(400).send({err: 'no hay comentarios'});
    }

   
    const checkComentario = await ComentarioClaseService.checkProfesorComentario(idComentario,userId)
    if(!checkComentario){
        return res.status(400).send({err: 'solo podes bloquear los comentarios de tus clases'});
    }

  
    if(!motivo){
        return res.status(400).send({err: 'falta mandar el motivo de bloqueo'});
    }

    const rechazarComentario = await ComentarioClaseService.rechazarComentario(idComentario, motivo);


    return res.status(200).send(rechazarComentario)
    
}
