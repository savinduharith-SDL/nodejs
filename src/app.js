const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const app = express();
app.use(express.json())
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;
const people = [
    { "name": "Savindu", "Industry": "music" },
    {
        "name": "Harith", "Industry": "Software"
    },
    {
        "name": "Tharuka", "Industry": "Security"
    }
];
const customer = new Customer({
    "name": "Savindu",
    "industry": "music"
});
app.get('/api/customers', async (req, res) => {
    console.log(await mongoose.connection.db.listCollections());
    try {
        const result = await Customer.find();
        res.send({ "Customers": result });
    } catch (e) {
        res.statusCode(500).json({ error: e.message });
    }
})
app.get('/', (req, res) => {
    res.send("Welocme!");
})
app.get('/api/customers/:id:test', async (req, res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try{
    const {id : customerID} = req.params;
    console.log(customerID);
    const customer = await Customer.findById(customerID);
    console.log(customer);
    res.json({customer})
}catch(e){
    res.status(500).json({error:'SOmething went wrong!'})
}
})
app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).json({ Customer: customer })
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

})

const start = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION);
        app.listen(PORT, () => {
            console.log('App Listening on PORT : ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}
start();