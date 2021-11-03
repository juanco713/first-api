const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     nombre: {
        type : String,
        required: true
    },
    precio: {
      type: String,
      default: 0  
    },
    descripcion: String 
});


module.exports = mongoose.model('Product', productSchema);
