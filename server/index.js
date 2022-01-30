
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./modules/user_modules')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
mongoose.connect('mongodb://localhost:27017/mern-stact-app')

app.use(cors())


//to tell express to parse anything which comes as body to json 
app.use(express.json())

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    //it take the num of cycles  u want usually 10 cycles are enough
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try {
       const user = await User.create({
           name: req.body.name,
           email:req.body.email,
           password:req.body.password
       })
       res.json({status: "ok"})
    } catch (err){
        console.log(err)
        res.json({status: "error", error:"Duplicate email"})
    }
 
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
   
      const user = await User.findOne({
           email:req.body.email
               })

        //it takes the password and the hash
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

       
       if(!user){
           return {status: 'error', error:'invalid login'}
       }

       if(user){
           const token = jwt.sign({
            name: user.name,
            email: user.email,
           }, 'secretkey')
           return res.json({status:'ok', user: token})
       } 

    else {
        return res.json({status:'error', user: false})

       
    }

    
})




//get quote
app.get('/api/quote', async (req, res) => {
   

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secretkey')
        const email = decoded.email
        const user = await User.findOne({email: email})

        //since user is logged in we can easily get users quote
        return { status:'ok', quote: user.quote}

    } catch (err){
        console.log(err)
        res.json({status:'error', error: 'invalid token'})
    }
   
 
 
})

//create quote
app.post('/api/quote', async (req, res) => {
    console.log(req.body)

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secretkey')
        const email = decoded.email
        await User.updateOne({email: email}, {$set: {quote: req.body.quote}})

        //since user is logged in we can easily get users quote
        return res.json({ status:'ok'})

    } catch (err){
        console.log(err)
        res.json({status:'error', error: 'invalid token'})
    }
   
 
 
})


app.listen(1007, () => console.log('Server running on 1007'))