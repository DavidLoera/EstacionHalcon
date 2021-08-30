const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentasSchema = new Schema({
    cliente: {
        type: String,
        required: true
      },
    producto: {
        type: String,
        required: true
      },
    folio   : {
        type: String,
        required: true
      }, 
    valor: {
      type: String,
      required: true
    },
    date: {
      type: Date,
    },
    cantidad: {
      type: String,
      required: true
    },
    noserie: {
        type: String,
        required: true
      },
    user: {
        type: String,
        required: true
      } 
  });
  
  module.exports = mongoose.model('Ventas', VentasSchema);