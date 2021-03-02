// adding ======="type": "module"==== in packgae.JSON to get ES6 Syntax
// Importing
import express from 'express';
// app config
const app=express();
const port=process.env.PORT || 9000;


// emiddleware

// DB config

//???

//api routes
app.get('/',(req,res)=>{

})



//listen
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})