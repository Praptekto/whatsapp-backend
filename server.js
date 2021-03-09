// adding ======="type": "module"==== in packgae.JSON to get ES6 Syntax
// Importing
import express from 'express';
import mongoose from 'mongoose';//gonna be the client that connected to our DB
import Messages from './dbMessages.js';
import Pusher from 'pusher'

// app config
const app=express();
const port=process.env.PORT || 9000;


const pusher = new Pusher({
    appId: "1164682",
    key: "29c5c84853526d195612",
    secret: "c6693761973a65e9c655",
    cluster: "ap1",
    useTLS: true
  });

const db=mongoose.connection;

db.once("open",()=>{
    console.log("db connected");

    const msgCollection=db.collection("messagecontents");
    const changestream=msgCollection.watch();

    changestream.on('change',(change)=>{
        console.log(change);

        if(change.operationType=='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('message','inserted',
            {
                name: messageDetails.user,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            })
        }else{
            console.log('Error triggering pusher')
        }

    })
})
 
// emiddleware
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
});


// DB config



const conn_url='mongodb+srv://Praptekto122:oGQYIIzrFU6ZcddQ@cluster0.zuf9w.mongodb.net/whatsappdb?retryWrites=true&w=majority';
const conn_url2='mongodb+srv://Praptekto:prapdbpertama@cluster0.soo3w.mongodb.net/db?retryWrites=true&w=majority';
try{
    console.log("apakah akan connect")
     await mongoose.connect(conn_url2,{
        
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    
    });    
    console.log("Berhasil connect")
}catch(err){
    console.log("gagal connect")
    console.log(err)
    
}




//???

//api routes
app.get('/',(req,res)=>{
    console.log('Connect')

})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500);
            res.send(err);
        }else{
            res.status(200).send(data);
        }
    })

})

app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500);
            res.send(err);
        }else{
            res.status(201);
            res.send(data);
        }
    })



})



//listen
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
}) 