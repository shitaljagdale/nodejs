const express = require('express')
const routes = express.Router()
const dao = require('./Dao/dao')
//get all employees
routes.get('/employees',(req,res)=>{

    dao._all((err,emps)=>{
        if(err){
            res.status(500).send({
                error:"Unable to load data"
            })
        }
        else{
            res.status(200).send({
                Employees:emps
            })
        }
    })
 
})
//add new employees/*
// routes.get('/projectwithemp/:projectid',(req,res)=>{
   
//     dao._addNewEmp(parseInt(req.params.projectid),(err,Projects)=>{
//         if(err){
//             res.status(500).send({
//                 error:"Unable to load data"
//             })
//         }
//         else{
//             res.status(200).send({
//                 Project:Projects[0].employees,
              
//            })
//         }
//     })
 
// })
//demo

routes.post('/project/emp/add',(req,res)=>{
    dao._addNewEmp(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                error:"unable to connect the request"
            })
        }
        else{
            res.status(201).send(data)
        }
    })
})


// add a new Project
routes.post('/project/add',(req,res)=>{
    res.send({
        data: dao._add(req.body)
    })
})
// update an employee by id
routes.put('/employees/update',(req,res)=>{
    dao._update(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                error: "Unable to process the request"
            })
        }else{
            res.status(200).send(data)
        }
    })
})

//delete 
routes.delete('/project/delete/:projectid',(rq,rs)=>{
    dao._deletProject(parseInt(rq.params.projectid),(err)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request"
            })
        }else{
            rs.status(200).send({
                message : "Project Deleted"
            })
        }
    })
})


module.exports={
    routes
}