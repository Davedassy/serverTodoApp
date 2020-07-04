const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../model/Todo");


// controller to get all todo
exports.getAllTodo = (req,res) => {
    Todo.find()
    .then(todo => {
        res.status(200).json(todo)
    } )
    .catch(err => {
        res.status(500).json(err)
    })
};

// controller to get single todo
exports.getSingleTodo = (req,res) => {
    Todo.findById({_id:req.params._id})
    .then(todo => {
        res.status(200).json(todo)
    } )
    .catch(err => {
        res.status(500).json(err)
    })
};


// controller to get add todo
exports.postTodo = (req,res) => {
    const { name,created } = req.body
    const todo = new Todo ({
        _id:mongoose.Types.ObjectId(),
       name,
       created,
    });
    todo.save()
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

// controller to update = todo
exports.updateTodo = (req,res,next) =>{
    const id = req.params._id


      Todo.findById({_id:id})
          .exec()
          .then(todo => {
            const newTodo = []
         newTodo.push(req.body.name)
          
         Todo.updateOne({_id:id},{$set:{name:newTodo[0]}})
            .then( todo => {
               res.status(200).json(todo)
            })
            .catch( err => {
                res.status(500).json(err)
            })
              
             
          })
          .catch( () => {
            res.status(404).json({message:"Not Found"})
        })
        
};


// controller to delete todo
exports.deleteTodo = (req,res,next) => {
    const id = req.params._id
    Todo.findById({_id:id})
        .exec()
        .then(todo => {
            if(!todo._id){
             return  res.status(404).json({message:"unable to match id"})
            }else{
               Todo.deleteOne()
               .then( () => {
                   res.status(200).json({message:"Delete successful"})
               })
               .catch( err => {
                   res.status(500).json(err)
               })
            }
        })
        .catch( () => {
          return res.status(404).json({message:"Not Found"})
        })
        
};


