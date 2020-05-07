const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')   //posting data to mongo db
const User  = mongoose.model("User")  // schema
const bcrypt = require('bcryptjs') // hash the pwds
const jwt = require('jsonwebtoken')   // jsonweb token for the clients
const {JWT_SECRET} = require('../keys')   // our token value is stored in keys.js
const requireLogin = require('../middleware/requireLogin')




// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("Hello User!!!")                                         //for checking purposes of tokens
// })



// router.get('/',(req,res)=>{
//     res.send("Hello!!!")
// })

router.post('/signup',(req,res)=>{
//console.log(req.body)             // we need to test so we use a service postman //  now err rises we need to register the json parse in app.js
    const {name,email,password} = req.body

    if(!email || !name || !password){
        return res.status(422).json({error:"Please enter all the fields !!!"})
    }

   // res.json({message:"Sucessfully Entered!!!"})

   User.findOne({email:email})
   .then((saveduser)=>{              
    if(saveduser){
        return res.status(422).json({error:"User already exists !!!"})
    }
    //hashing the pwd
    bcrypt.hash(password,12)// the numbeer specified here > the value more the security
    .then((hashedpassword)=>{
         //else part
        const user = new User({
        email,
        password:hashedpassword,
        name
        })
    
        user.save()
        .then(user=>{
        res.json({message:"User saved succesfully!!!"})
        })
        .catch(err=>{
        console.log(err)
        })

    })
   
 })  
   .catch(err=>{
    console.log(err)
    })


})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password!!!"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password!!!"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in!!!"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
               }
            else{
                return res.status(422).json({error:"Invalid Email or password!!!"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router