const express = require('express');
const app = express();
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const { createRoles} = require('./src/config/initialSetup')
const helmet = require("helmet");


app.use(helmet());
app.use(express.json());
createRoles()

app.use('/api', require('./src/routes/product'));
app.use('/api', require('./src/routes/user'));
app.use('/api', require('./src/routes/paymethods'));
app.use('/api', require('./src/routes/orders'))


function loadSwagger(app) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/doc_api.yml', 'utf8'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};

function main() {
    loadSwagger(app);
};
main();


module.exports = app;