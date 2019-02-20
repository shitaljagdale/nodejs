const express=require('express')
const server=express()
const parser=require('body-parser')
const routes=require('./routes').routes
const PORT=4001
server.use(parser.json())

server.get('/status',(req,res)=>{
   res.send(
       {
           message:"server is up and running"
       }
   )
})

server.use('/organization',routes)

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
