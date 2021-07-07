
const { request, response } = require('express')
const express=require('express')
const app=express()
const morgan=require('morgan')
const mysql=require('mysql')
const bodyParser=require('body-parser')
app.use(express.static('./public'))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:false}))

// mysqllll 
// commit 
const connection=getConnection()

 connection.connect()
app.get("/user",(request,response) =>{
   
    //console.log("fetching user with id:"+request.params.id) 
        
    const queryString="select * from users";
    connection.query(queryString,(err,rows,fields)=>{
        console.log("i think we fetched users successfully");
        console.log(rows)
        response.json([rows])     
    })
})
        
   // response.end()
app.get("/", (request,response) => {
    console.log("respondinf to route route")
    response.send("Hello from root")

})

app.get("/users",(request,response) =>{
    var user1={name:"hitesh",mobile:"12000000"}
    var user2={name:"tilu", mobile:"1200000000"}
    response.json([user1,user2])
    response.send("Nodemon autoupdates when i save this file")
})


app.listen(3002, ()=>{
    console.log("server is up and listening on 3002..")
})

app.post('/user_create',(request,response)=>{
    console.log('trying to create a new user')
    console.log("name1" +request.body.name1)
    const name2=request.body.name1
    const mobile2=request.body.mobile1
    const queryString="insert into tilu(name,mobile) values(?,?)"
    getConnection().query(queryString,[name2,mobile2],(err,results,fields)=>{
        if(err)
        {
            console.log("failed to insert new user:"+err)
            response.sendStatus(500)
            return
        }
        console.log("Inserted  new user with id:",results) 
        response.json('Congratulations tilu')   
    })

})

function getConnection()
{
    return mysql.createConnection({
        user:'u738095806_owlseye',
        host:'sql471.main-hosting.eu',
        database:'u738095806_owlseye',
        password:'Ulluseye$pro%dual5'
    })
}
