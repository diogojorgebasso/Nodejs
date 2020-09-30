const Taskmodel = require('../model/TaskModel');
const current = new Date();
const { startOfDay, endOfDay } = require('date-fns')
//Mongo gera o 'id' automaticamente
//toda vez que o usuário clicar em alguma coisa, é uma rota
class TaskController{
    async create(req, res){
        const task = new Taskmodel(req.body);
        await task.save()
        .then(response => { //caso de certo
            return res.status(200).json(response);
        })
        .catch(error =>{ //caso de errado
            return res.status(500).json(error);
        });
    };
    async update(req,res){
        await Taskmodel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new:true})
        .then(response =>{
            res.status(200).json(response);
        })
        .catch(error =>{
            res.status(500).json(error);
        });

    };
    async all(req,res){ //rota para listar todas as tarefas
        await Taskmodel.find({ macaddress: {'$in': req.params.macaddress}})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error)
        });
    };
    async show(req,res){
        await Taskmodel.findById(req.params.id)
        .then(response => {
            if (response){
                return res.status(200).json(response);
            }
            return res.status(500).json({error: 'tarefa n encontrada'});
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    };
    async delete(req,res){
        await Taskmodel.deleteOne({'_id': req.params.id})
        .then( response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }
    async done(req,res){
        await Taskmodel.findByIdAndUpdate(
         {"_id": req.params.id},
         {'done': req.params.done},
         {new: true})
         .then(response =>{
             return res.status(200).json(response)
         })
         .catch(error =>{
             return res.status(500).json(error)
         })   
    }
    async late(req,res){
        await Taskmodel.find({
        'when': {'$lt': current},
        'macaddress': {'$in': req.params.macaddress}})
        .sort('when')
        .then(reponse =>{
            return res.status(200).json(reponse);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }
    async today(req,res){
        await Taskmodel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }
};


module.exports = new TaskController();