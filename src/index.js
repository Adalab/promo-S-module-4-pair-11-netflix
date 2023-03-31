const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// 
mysql
  .createConnection({
    host: 'localhost',
    database: 'empleados',
    user: 'root',
    password: 'tuPassword',
  })
  .then(connection => {
    connection
      .connect()
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      })
      .then(() => {
        return connection.query('SELECT * FROM empleados');
      })
      .then(([results, fields]) => {
        results.forEach((result) => {
          console.log(result);
        });
      })
      .catch((err) => {
        console.error('Error en la query: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });
