const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin') //middle ware for authorizing tokens jwt
const Post = mongoose.model("Post")

router.get('/allpost',(req,res)=>{                     // for viewing all the posts
    Post.find()// to get all the post
    .populate("postedBy","_id name") // used to show all details about the one who posted the post instead showing  only the id
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
       return res.status(422).json({error:"Please add all fields"})
    }
  //  console.log(req.user)
    //res.send("ok")
    req.user.password = undefined // removing password from displayng in postedBy
     const post =new Post({
         title,
         body,
         postedBy:req.user
     })
     post.save().then(result=>{
         res.json({post:result})
     })
     .catch(err=>{
         console.log(err)
     })
})
// get and post :
//Get -- request data from any specific resource
//Post -- send data to any of the specific resource

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router