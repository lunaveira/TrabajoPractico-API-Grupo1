var UserService = require('../services/user.service');
var ContratacionService = require('../services/contrataciones.service');



exports.contratarClases = async function(req,res){

    const {isAlumno, userId} = req;

    if(!isAlumno){
        return res.status(401).send({err: 'solo alumnos pueden acceder'});
    }
 

    const userFound = await UserService.getUserById(userId);

   
    if(!userFound){
        return res.status(400).send({err: 'No existe user en BD'});
    }

    const { email, telefono, horario, motivo, idClase } = req.body;

    if(!email || !telefono || !horario || !motivo || !idClase ){
        return res.status(400).send({err: 'campos invalidos / incompletos'})
    }

    const nuevaContratacion = {
        email,
        telefono,
        horario,
        motivo,
        clase: idClase,
        alumno: userId,
        status: 'Solicitada'

    }

    const nuevaContratacionResponse = await ContratacionService.createContratacion(nuevaContratacion);
    return res.status(200).send({}); 


}


exports.getClasesContrtadasPorAlumnos = async function(req,res){

    const {isAlumno, userId} = req;

    if(!isAlumno){
        return res.status(401).send({err: 'Solo los alumnos pueden acceder'});
    }
 

    const userFound = await UserService.getUserById(userId);

     
    if(!userFound){
        return res.status(400).send({err: 'No se encontro al alumno'});
    }

    const contratacionesFound = await ContratacionService.getContratacionesByAlumno(userId)

    return res.status(200).send(contratacionesFound)


}


exports.getContratacionesByClase = async function(req,res){

    const { isProfesor, userId } = req;


    if(!isProfesor){
        return res.status(401).send({err: 'Solo profesores pueden acceder'});
    }

    const userFound = await UserService.findById(userId);

    
    if(!userFound){
        return res.status(400).send({err: 'No se encontro al user'});
    }


    const { idClase } = req.params;

    const claseFound = await ClaseService.findById(idClase);

    
    if(!claseFound){
        return res.status(400).send({err: 'No se encuentra la clase'});
    }

    if(claseFound.idProfesor !== userId){
        return res.status(401).send({err: 'Solo el profesor de esta clase puede ver las contrataciones'});
    }

    const allContrataciones = await ContratacionService.getAllContratacionesByIdClase(idClase);


    return res.status(200).send(allContrataciones);

}


exports.aceptarContratacion = async function (req, res) {

    const { isProfesor, userId } = req;

    if(!isProfesor){
        return res.status(401).send({err: 'No sos profesor'});
    }

    const userFound = await UserService.findById(userId);

    
    if(!userFound){
        return res.status(400).send({err: 'No se encuentra al user en la BD'});
    }

    
    const { idContratacion } = req.body;

   
    if(!idContratacion){
        return res.status(400).send({err: 'No hay contrataciones'});
    }


  
    const contratacionFound = await ContratacionService.findById(id);

  
    if(!contratacionFound){
        return res.status(400).send({err: 'No existe'});
    }

    const { idClase } = contratacionFound;

    const claseFound = await ClaseService.findById(idClase);

  
    if(!claseFound){
        return res.status(400).send({err: 'No encuentra la clase'});
    }

    if(claseFound.idProfesor !== userId){
        return res.status(401).send({err: 'Solo el profesor de esta clase puede aceptar la contratacion'});
    }

    const updateContratacion = await ContratacionService.updateContratacion(idContratacion, 'Aceptada')

    return res.status(200).send(updateContratacion);

}


exports.cancelarContratacion = async function (req, res) {

    const { userId } = req;


    const userFound = await UserService.findById(userId);

   
    if(!userFound){
        return res.status(400).send({err: 'No existe user en BD'});
    }

    
    const { idContratacion } = req.body;


    if(!idContratacion){
        return res.status(400).send({err: 'No hay contrataciones'});
    }

    
    const contratacionFound = await ContratacionService.findById(id);


    if(!contratacionFound){
        return res.status(400).send({err: 'No existe la contratacion'});
    }

  
    if(contratacionFound.idUser === userId){

        const updateContratacion = await ContratacionService.cancelarContratacion(idContratacion, 'Cancelada')

        return res.status(200).send(updateContratacion);

    }
    else{
        

        const { idClase } = contratacionFound;

        const claseFound = await ClaseService.findById(idClase);
    
      
        if(!claseFound){
            return res.status(400).send({err: 'Clase no existe'});
        }
    
        if(claseFound.idProfesor !== userId){
            return res.status(401).send({err: 'Solo el profesor de esta clase puede cancelar la contratacion'});
        }
    

    const updateContratacion = await ContratacionService.updateContratacion(idContratacion, 'Cancelada')

    return res.status(200).send(updateContratacion);

    }

}



exports.finalizarContratacion = async function (req, res) {

    const { userId } = req;


    const userFound = await UserService.findById(userId);

    if(!userFound){
        return res.status(400).send({err: 'No existe el user'});
    }

    const { idContratacion } = req.body;

   
    if(!idContratacion){
        return res.status(400).send({err: 'No existe la contratacion'});
    }

    
    const contratacionFound = await ContratacionService.findById(id);

  
    if(!contratacionFound){
        return res.status(400).send({err: 'No existe el user en BD'});
    }

    
    if(contratacionFound.idUser === userId){

        const updateContratacion = await ContratacionService.updateContratacion(idContratacion, 'Finalizada')

        return res.status(200).send(updateContratacion);

    }
    else{
       

        const { idClase } = contratacionFound;

        const claseFound = await ClaseService.findById(idClase);
    
        if(!claseFound){
            return res.status(400).send({err: 'No encuentra la clase'});
        }
    
        if(claseFound.idProfesor !== userId){
            return res.status(401).send({err: 'Solo el p0rofesor de esta clase puede finalizar la contratacion'});
        }
    

    const updateContratacion = await ContratacionService.updateContratacion(idContratacion, 'Finalizada')

    return res.status(200).send(updateContratacion);

    }

}
