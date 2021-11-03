const mongoose = require('mongoose');

const payMethodSchema = new mongoose.Schema({
     nombre: {
        type : String,
        required: true
    },
    descripcion: String 
});


module.exports = mongoose.model('Pago', payMethodSchema);