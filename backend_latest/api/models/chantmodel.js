const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: String, required: true},
    date_slokam: {type: String, required: true},
    slokam: {type: String, required: true},
    count_slokam: {type: Number, required: true},
    timestamp:{type: String, required: true}
});

module.exports = mongoose.model('Chant', userSchema);