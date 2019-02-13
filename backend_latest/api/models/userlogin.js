const mongoose = require('mongoose');

const userLogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    mobile:{type: Number, required: true}
});

module.exports = mongoose.model('UserLogin', userLogSchema);