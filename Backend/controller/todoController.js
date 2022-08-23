
const { mongoose } = require('mongoose');
const ListTD = require('../model/listModel');
const User = require('../model/userModel');

  const ListTDController = {
    // get todo by page
     getListPage : async(req,res) =>{
        try {
            let page;
            if(req.query.page){
                page = parseInt(req.query.page);
            }else{
                page = 1;
            }
            const limit = 6;
            const skip = (limit * page) - limit;
            const isAdmin = req.user.isAdmin;
            if(isAdmin){ 
                const count = await ListTD.count();
                const totalPages = Math.ceil(count / limit)
                const total = await ListTD.countDocuments({});
                const todo = await ListTD.find({}).sort({status:1,createdAt:-1}).skip(skip).limit(limit);
                res.status(200).json({todo,total,totalPages});
            }
            else{
                const count = await ListTD.find({owner: req.user.id}).count();
                const totalPages = Math.ceil(count / limit)
                const total = await ListTD.find({owner: req.user.id}).countDocuments({});
                const todo = await ListTD.find({owner: req.user.id}).sort({status:1,createdAt:-1}).skip(skip).limit(limit);
                 res.status(200).json({todo,total,totalPages});  
            }  
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // create todo
    createList : async(req,res)=>{
       try {
        const newToDo = await new ListTD({
           
            title: req.body.title,
            owner: req.user.id
            
        });
        const todolist = await newToDo.save();
        res.status(200).json("Create success");
       } catch (error) {
        res.status(500).json(error)
       }
    },

    //delete todo
    deleteList : async(req,res)=>{
        try {
            const todo = await ListTD.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete success");
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //delete all todo
    deleteAllList : async(req,res) =>{
        try {
            const isAdmin = req.user.isAdmin;
            if(isAdmin){
            const todo = await ListTD.find().deleteMany();
            res.status(200).json("Delete all success");
            }else {
                const todo = await ListTD.find({ owner: req.user.id }).deleteMany();
                res.status(200).json("Delete all success");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
        
    },

    // update todo
    updateList : async(req,res) => {
        try {
            const itemUpdate = await ListTD.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

            if (itemUpdate) {
                const item = req.body;
                itemUpdate.title = item.title;
                itemUpdate.status = item.status;
                await itemUpdate.save();
                res.status(200).json({ user: itemUpdate.toJSON(), item: item });
            } else {
                res.status(400).json("False")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
  }
  module.exports = ListTDController;