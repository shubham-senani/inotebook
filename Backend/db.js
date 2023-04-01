const mongoose  = require('mongoose');

const Connection_URL = "mongodb://127.0.0.1:27017/iNotes";

const connectToMongod = ()=>{
    mongoose.connect(Connection_URL)
    .then(()=>{
        console.log("server is connected to Mongodb");
    })
    .catch((err)=>{
        console.log(err.message);
    })   
}
module.exports = connectToMongod;
