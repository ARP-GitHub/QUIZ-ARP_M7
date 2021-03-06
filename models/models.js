﻿var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
			      {
				dialect: protocol, 
				protocol: protocol,
				port: port,
				host: host,
				storage: storage,
				omitNull: true
		});

// Importar definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// exportar tablas
exports.Quiz = Quiz; 

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){     
       if(count === 0) { 
	  // la tabla se inicializa solo si está vacía
	  // si se meten más preguntas (registros) es preciso borrar la tabla (entorno local), y resetearla (en heroku)
            Quiz.bulkCreate( 
               		[ {pregunta: 'Capital de Alemania',  respuesta: 'Berlín'},
			  {pregunta: 'Capital de España',  respuesta: 'Madrid'},
			  {pregunta: 'Capital de Francia',  respuesta: 'París'},
			  {pregunta: 'Capital de Grecia',  respuesta: 'Atenas'},
			  {pregunta: 'Capital de Irlanda',  respuesta: 'Dublín'},
			  {pregunta: 'Capital de Italia',  respuesta: 'Roma'},
			  {pregunta: 'Capital de Noruega',  respuesta: 'Oslo'},
			  {pregunta: 'Capital de Polonia',  respuesta: 'Varsovia'},
			  {pregunta: 'Capital de Portugal',  respuesta: 'Lisboa'},
			  {pregunta: 'Capital de Rumanía',  respuesta: 'Bucarest'},
			  {pregunta: 'Capital de Reino Unido',  respuesta: 'Londres'},
			  {pregunta: 'Capital de Rusia',  respuesta: 'Moscú'},
			  {pregunta: 'Capital de San Marino',  respuesta: 'San Marino'},
			  {pregunta: 'Capital de Suecia',  respuesta: 'Estocolmo'},
			]
	    ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
       };
  });
});
    