'use strict'

//Importing express
const express = require('express');
//Import cors
const cors = require('cors');
//import axios
const axios = require('axios');

const server = express();
//importing data.json
const movie = require('./data.json')
//PORT 
const PORT = 3000;


//opening the server for any user
server.use(cors());
server.use(errorHandler)

//constructor
function Movie (title , poster_path , overView){
    this.title = title ;
    this.poster_path = poster_path ;
    this.overView = overView ; 
}
//Routes
//home
server.get('/',homeHandler);
//favotite
server.get('/favorite',favoriteHandler);
//Something wrong
//dafault
server.get('*',(req,res)=>{
    res.status(404).send('No such page')
})
//PORT listen
server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

//handler functions
//home handler
function homeHandler(req,res){
try {
    let homeAnswer = new Movie(movie.title , movie.poster_path , movie.overview);
    res.status(200).send(`<b>Title:</b> ${homeAnswer.title}<br><b>Poster path:</b> ${homeAnswer.poster_path}<br><b>Overview:</b> ${homeAnswer.overView}`);   

}
catch(error){
    errorHandler(error,req,res);
}   
}
//favorite handler
function favoriteHandler (req,res){
try {
    res.send('welcome to favorite page');
}
catch(error){
    errorHandler(error,req,res);
}
}

//error handler
function errorHandler (error,req,res,next){
    const resErr ={
        status : 500 , 
        message : error , 
    }
    res.status(500).send(resErr);
}