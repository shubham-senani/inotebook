const express = require('express')
const connectToMongod = require('./db.js')
const User = require('./models/user')

connectToMongod();

const app = express();
app.use(express.json())
const port = 8080;

app.get('/',(req, res)=>{
})

app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


app.listen(port, ()=>{
    console.log(`server running on 'http://localhost:${port}`)
})

