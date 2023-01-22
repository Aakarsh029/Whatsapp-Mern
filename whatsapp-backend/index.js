import express from "express";
import mongoose from "mongoose";
import Messages from "./db.js"; 
import Pusher from "pusher"; 
import cors from "cors";
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1541865",
    key: "6447a1db55682a28b547",
    secret: "d5385813bb7282d341df",
    cluster: "ap2",
    useTLS: true
  });
  
app.use(express.json());
app.use(cors());
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })
const curl = 'mongodb+srv://Aakarsh:InCTmcm1bqni8BCd@cluster0.nc3qb8d.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.set("strictQuery",true);
mongoose.connect(curl)
// .then(()=> {
//     console.log("Connected to MongoDB") 
// }).catch((err) =>{
//     console.log(err)
// }); 

const db = mongoose.connection;
db.once("open", () => {
    console.log("db is connected");
  
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
  
    changeStream.on("change", (change) => {
      console.log("a change occured", change);
  
      if (change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received:messageDetails.received
        });  
      } else {
        console.log("error triggering pusher");
      }
    });
  });

app.get("/",(req,res) => res.status(200).send("Hello World"));

app.get('/messages/sync',(req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        } else
        {
            res.status(201).send(data);
        }
    })
}); 

app.post("/messages/new",(req,res) => {
    const dbmessage = new Messages(req.body);
    // console.log(dbmessage);
    // res.send(dbmessage);
    dbmessage.save();
    try{
        res.status(201).send(dbmessage);
    }catch(err){
        res.status(500).send(err);
    }   
});
app.listen(port, () => console.log(`Listening on localhost :${port}`));