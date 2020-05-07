const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const{authorization} = req.headers //takes values from req.headers and insert to authorization
    //authorization ===> Bearer jksbdjfgjkabfkjbjksb
    //authorization consists of the word Bearer "tokens"
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    //else 
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }

        const {_id} = payload     //from payload we destructure or get the value for _id
        User.findById(_id).then(userdata=>{                 //finding the user with taht id if its sucessful then we get user data and we can makeuse that user data in req.user
            req.user = userdata    
            next()
        })
        
    })

}