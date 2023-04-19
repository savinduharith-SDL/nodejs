const mongoose = require('mongoose');
const customerScchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    industry: String
});
module.exports = mongoose.model('Clients',customerScchema);