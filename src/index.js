const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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
let connection; //hay que definir la variable
mysql
  .createConnection({
    host: "127.0.0.1",
    database: "netflix",
    user: "root",
    password: "Topocerdo@85",
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .catch((err) => {
        console.error("Error de conexion: " + err.stack);
      })
      .then(() => {
        return connection.query("SELECT * FROM movies");
      })
      .then(([results, fields]) => {
        results.forEach((result) => {
          //console.log(result);
        });
      })
      .catch((err) => {
        console.error("Error en la query: " + err.stack);
      });
  })
  .catch((err) => {
    console.error("Error de configuración: " + err.stack);
  });

  //Ahora, tenemos que incorporar el código para lanzar la sentencia select dentro de una función de un endpoint. Añade al final del fichero index.js.
  server.get("/movies", (req, res)=>{
   // console.log("Pidiendo base de datos");
    const genreFilterParam = req.query.gender;
    const sortFilterParam = req.query.sort;
    console.log(genreFilterParam);
    
    if (genreFilterParam !== "") {
      connection 
        .query("SELECT * FROM movies WHERE gender = ?", [genreFilterParam])
        .then(([results, fields]) => {
          res.json({
            succes: true,
            movies: results,
            //variable result tiene que estar dentro de .then
          });
        });
    } else  {
      connection 
    .query("SELECT * FROM movies")
      .then(([results, fields])=>{
    res.json({
      succes: true,
      movies: results,
      //variable result tiene que estar dentro de .then
    });
    });
    }
  })