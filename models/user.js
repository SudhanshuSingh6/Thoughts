const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true
    },
    password:{
        type:'string',
        required: true
    },
    date:{
        type: 'date',
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);