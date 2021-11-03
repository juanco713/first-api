# First API
API de un sistema de ordenes de un comercio con NodeJs y express

## Ejecucion local

Instalar dependencias necesarias para correr la API 

``` 
$ npm i express mongoose jsonwebtoken
$ npm i helmet js-yaml redis swagger-ui-express
$ npm i chai mocha supertest --dev

```

## Iniciar el servidor

Para iniciar el servidor al igual que la base de datos se debe modificar los parametros ubicados en el archivo config.js situado en la carpeta src/config/config.js. 

```
Configurar los parametros necesarios en el archivo config.js ubicado en la carpeta src/config.

db = 'mongodb.database' --> Aca se debe colocar donde esta situada la base de datos ya sea con MongoDB Atlas o de manera local.

port = '3000' --> Se le indica a express por cual puerto establecera la conexion del servidor.

```
## Base de datos

Para la base de datos se utilizo MongoDB, por lo cual debera tener instalado MongoDB de manera local o a traves del servicio MongoDB Atlas.

```
Luego de configurar los parametros en el archivo config.js, se debe ejecutar mediante node el archivo index.js el cual arranca el servidor y la base de datos.

$ node index.js

``` 

## Testing

Para testear el endpoint que permite registrar al usario usar el comando establecido en el archivo package.json el cual ejecuta el Mocha.

```
$ npm run test

```

## Documentacion con Swagger

En el archivo doc_api.yml que se corre cuando se inicie el servidor en http://localhost:3000/api-docs/


