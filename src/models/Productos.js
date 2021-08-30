const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
      },
      marca:{
        type: String,
        required: true
      },
      precio:{
        type: Number,
        required: true
      },
      modelo:{
        type: String,
        required: true
      }
      , 
      tipop: {
        type: String,
        required: true
      },
      user: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Productos', ProductoSchema);