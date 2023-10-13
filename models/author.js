const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

// this adds the schema to the rest of the application
module.exports = mongoose.model('Author',authorSchema);