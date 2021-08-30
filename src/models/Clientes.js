const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    fullName: {
        type: String,
        required: 'Este archivo es requerido'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    user: {
        type: String,
        required: true
      }
});


module.exports = mongoose.model('Cliente', ClienteSchema);