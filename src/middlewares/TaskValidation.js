const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req,res,next) =>{
    const { macaddress, type, title, description, when } = req.body;
    if (!macaddress || !type ||!title ||!description ||!when) //checagem para ver se tem algo nas requisições
        return res.status(400).json({ error: "todos os campos são obrigatórios"});
    else if(isPast(new Date(when)))
        return res.status(400).json({ error: 'Ta no filme de volta pro futuro?'})
    else{
        let exists;
        if (req.params.id){
            exists = await TaskModel.findOne({ '_id': {'$ne': req.params.id},
                                            'when': {'$eq': new Date(when)}, 
                                            'macaddress': {'$in': macaddress}}); 
        }else{
            exists = await TaskModel.findOne({ 'when': {'$eq': new Date(when)}, 
                                            'macaddress': {'$in': macaddress}});
        }
        if (exists){ //é possível cadastrar dois quartos ao mesmo tempo? Não.
            return res.status(400).json({ error: 'Dois corpos não ocupam o mesmo lugar ao mesmo tempo'})
        }
        next();
    };
    
};

module.exports = TaskValidation;