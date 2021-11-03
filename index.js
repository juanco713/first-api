const mongoose = require("mongoose");
const config = require('./src/config/config');
const app = require("./app");
const db = mongoose.connection;

function connectDB(){
    mongoose.connect(config.db ,{ useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true, useCreateIndex: true});
    db.on('error', (error) => console.error(error));
    db.once ('open', () => console.log('Connected to DataBase'));
    app.listen(config.port, () => {
        console.log(`Server running in: http://localhost:${config.port}`)
    });
};

connectDB();

module.exports = { connectDB };


