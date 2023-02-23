'use strict'

//Importing express
const express = require('express');
//Import cors
const cors = require('cors');

const server = express();

//PORT 
const PORT = 3000;


//opening the server for any user
server.use(cors());

//Routes
//home
server.get('/',(req,res)=>{
    res.status(200).send('constructer')
})
//favotite
server.get('/favorite',(req,res)=>{
    res.send('favorite');
})
//Something wrong
//dafault
server.get('*',(req,res)=>{
    res.status(404).send('No such page')
})
//PORT listen
server.listen('PORT',()=>{
    console.log(`listening on ${PORT}`)
})

//test