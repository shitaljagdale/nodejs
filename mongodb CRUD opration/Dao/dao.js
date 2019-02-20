const MongoClient=require('mongodb').MongoClient
const _url='mongodb://localhost:27017'
const _db='Organization'

//fetch all emps

const getAllEmployees=(callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        console.log("Connect to mongo server")
        conn.db(_db).collection('ProjectWithEmp').find({},{fields:{ _id:0}}).toArray((err,emps)=>{
            callback(err,emps)
        })
    })
}
//add new employee to project
const getEmployessWithinProject=(project,callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('ProjectWithEmp').find({projectid:2}).toArray((err,projects)=>{
            callback(err,projects)

        })
    })
}
const addEmpInProject=(project,callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        getEmployessWithinProject(project,(err,projects)=>{
            let pArr=[]
            pArr=projects[0].employees
            console.log(pArr)
            pArr.push(project)
            conn.db(_db).collection('ProjectWithEmp').updateMany({projectid:2},{$set:{employees:pArr}},(err,data)=>{
                callback(err,data)
            })
        })

    })

}

// add a new project
const addProject  = (emp)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('ProjectWithEmp').insertOne(emp,(err)=>{
            console.log('Employee Added')
        })
    })
}

//delete project

const deleteByProjectId = (projectid,callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('ProjectWithEmp').deleteOne({ projectid: projectid},(err)=>{
            callback(err)
        })
        
        conn.close()
    })
}
// update an employee
const updateEmployee = (emp,callback)=>{
    const id = emp.id
    delete emp.id
    console.log(emp)
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('ProjectWithEmp').updateOne({
            id: id
        },{
            $set: emp
            
        },(err,data)=>{
            callback(err,{
                message : 'Employee Updated'
            })
        })
        // close the connection
        conn.close()
    })
}


module.exports={
    _all:getAllEmployees,
    _add:addProject,
    _update:updateEmployee,
    _deletProject:deleteByProjectId,
    _addNewEmp:addEmpInProject
}