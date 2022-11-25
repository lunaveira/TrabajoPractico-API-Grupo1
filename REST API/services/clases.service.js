const Clases = require("../models/clases.model")


exports.getClases = async function(){
    return await Clases.find().populate('profesor');
}

exports.getClasesByCondition = async function (condition) {

    try {
        return await Clases.find(condition);
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }

}

exports.findById = async function (id) {

    try {
        return await Clases.findById(id).populate('profesor');
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}

exports.deleteClase = async function (id) {

    try {
        return await Clases.deleteOne({_id:id})
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}

exports.editClase = async function (id, claseEdited) {

    try {
        return await Clases.updateOne({_id:id}).set(claseEdited)
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}



exports.createClase = async function (claseToADd) {

    try {
        const nuevaClase = new Clases({
            ...claseToADd
        })
        return await nuevaClase.save()
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}

exports.despublicarClase = async function (idDeClase) {
    try {
        return await Clases.updateOne({_id: idDeClase},{publicada:false})
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}

exports.publicarClase = async function (id) {

    try {
        return await Clases.updateOne({_id:id},{ publicada: true})
    }
    catch (err) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}






