const express = require('express')    //APP.JS IS OUR SERVER
const app = express()

const PORT = 5000// port

const mongoose = require('mongoose') //initialising mongoose

const{MONGOURI} = require('./keys') //calling the mongouri from keys.js which is having the link fr connection


//connection establishment

mongoose.connect(MONGOURI,{
useNewUrlParser: true,                            //to avoid warnings
useUnifiedTopology: true 
})


mongoose.connection.on('connected',()=>{
 console.log("YEAH CONNECTED TO DB")                   //for connection to mongo

})

mongoose.connection.on('error',(err)=>{
    console.log("ERROR connecting",err)
   })                                               //incase of err it also displays err

   //connection established
   


require("./models/user")          //registering here in app.js from the user.js i.e the model
require("./models/post")


app.use(express.json())
app.use(require("./routes/auth"))   //created a file auth.js for sign in and sign up routes AND REGISTERING IN APP.JS HERE
app.use(require("./routes/post"))



//br2sPycz7C1b9OTw
// const customMiddleware = ((req,res,next)=>{

//     console.log("Middle ware executed!!!")
//     next()

// })

//app.use(customMiddleware)

// app.get('/',(req,res)=>{
//     console.log("Hello")
//     res.send("Hello World")
// })


// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")

//  })
app.listen(PORT,()=>{
    console.log("Server is running",PORT)
})
