const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const app = express();
app.use(express.json())
mongoose.set('strictQuery',false);
app.use(express.urlencoded({extended:true}));
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;
const people = [
    {"name": "Savindu","Industry":"music"},
    {
        "name": "Harith","Industry":"Software"
    },
    {
        "name": "Tharuka","Industry":"Security"
    }
];
const customer = new Customer({
    "name": "Savindu",
    "industry":"music"
});
app.get('/api/customers',(req,res)=>{
    res.send({"Customers":people})
})
app.get('/',(req,res)=>{
    res.send(customer);
})
app.post('/api/customers',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

const start = async() => {
    try{
    await mongoose.connect(process.env.CONNECTION);
    app.listen(PORT, ()=>{
        console.log('App Listening on PORT : '+PORT);
    });   
}catch(e){
    console.log(e);
}
}
start();