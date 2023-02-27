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
//import the pg
const pg = require('pg');
//import dotenv
require('dotenv').config();

//opening the server for any user
server.use(cors());
server.use(errorHandler)

//constructor
function Movie (title , poster_path , overView){
    this.title = title ;
    this.poster_path = poster_path ;
    this.overView = overView ; 
}
//new Constructor 
function trndCons (id,title,name,poster_path,overview){
    this.id = id ;
    this.title = title ||name ;
    this.poster_path = poster_path ;
    this.overview = overview ; 
}
//series constructer
function series (id,seasonNumber,episodeNumber,title,overview){
    this.id = id ;
    this.seasonNumber = seasonNumber;
    this.episodeNumber = episodeNumber;
    this.title = title;
    this.overview = overview;
}
//Routes
//home
server.get('/',homeHandler);
//favotite
server.get('/favorite',favoriteHandler);
// /trending
server.get('/trending',trendHandler);
//search
server.get('/search',searchHandler);
// last of Us series episode
server.get('/lastOfUs',lastHandler);
//discover movies
server.get('/discover',discoverHandler);
//dafault
server.get('*',(req,res)=>{
    res.status(404).send('No such page');
})
//PORT listen
server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
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
function trendHandler (req,res){
    try {
    const apiKey =process.env.apiKey
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
    const trendResult = axios.get(url)
    .then((ses)=>{
        let resultForm = ses.data.results.map((item)=>{
            let newMovie = new trndCons(item.id,item.title,item.name,item.poster_path,item.overview)
            return newMovie;
        })
        res.send(resultForm);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}
catch(err){
    errorHandler(err,req,res);
}
}
function searchHandler (req,res){
    try{
   const apiKey = process.env.apiKey ;
   const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=the&page=2`  
   axios.get(url)
   .then((axiosRes)=>{
     const resForm = axiosRes.data.results.map((item)=>{
        let newMovie = new trndCons(item.id,item.title,item.name,item.poster_path,item.overview);
        return newMovie ;
     })
     res.send(resForm)
   })
   .catch((err)=>{
    errorHandler(err,req,res);
   })
}
catch(err){
    errorHandler(err,req,res);
}
}
function lastHandler (req,res){
    try{
    const apiKey = process.env.apiKey ;
    const url = `https://api.themoviedb.org/3/tv/100088/season/1?api_key=${apiKey}&language=en-US`  
    axios.get(url)
    .then((axiosRes)=>{
      const resForm = axiosRes.data.episodes.map((item)=>{
         let newEpisode = new series(item.id,item.season_number,item.episode_number,item.name,item.overview);
         return newEpisode ;
      })
      res.send(resForm)
    })
    .catch((err)=>{
     errorHandler(err,req,res);
    })
}
catch(err){
    errorHandler(err,req,res);
}
}
 function discoverHandler (req,res){
    try{
    const apiKey =process.env.apiKey
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    const trendResult = axios.get(url)
    .then((ses)=>{
        let resultForm = ses.data.results.map((item)=>{
            let newMovie = new trndCons(item.id,item.title,item.name,item.poster_path,item.overview)
            return newMovie;
        })
        res.send(resultForm);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}
catch(err){
    errorHandler(err,req,res);
}
}
//error handler
function errorHandler (err,req,res,next){
    const resErr ={
        status : 500 , 
        message : err , 
    }
    res.status(500).send(resErr);
}