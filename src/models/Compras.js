const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComprasSchema = new Schema({
    producto: {
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
    usuario: {
        type: String,
        required: true
      },
    proveedor: {
        type: String,
        required: true
      },      
    user: {
        type: String,
        required: true
      } 
  });
  
  module.exports = mongoose.model('Compras', ComprasSchema);