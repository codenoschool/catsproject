var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
});

var Cat = module.exports = mongoose.model('Cat', catSchema);