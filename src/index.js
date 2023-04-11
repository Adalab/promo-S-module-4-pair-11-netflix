const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');


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
    console.log(sortFilterParam);
    
    if (genreFilterParam !== "") {
      connection 
        .query(`SELECT * FROM movies WHERE gender = ? ORDER BY title ${sortFilterParam}`, [genreFilterParam] )
        .then(([results, fields]) => {
          res.json({
            succes: true,
            movies: results,
            //variable result tiene que estar dentro de .then
          });
        });
    } else  {
      connection 
    .query(`SELECT * FROM movies ORDER BY title ${sortFilterParam}`)
      .then(([results, fields])=>{
    res.json({
      succes: true,
      movies: results,
      //variable result tiene que estar dentro de .then
    });
    });
    }
  })

  //endpoint para el login
server.post("/login", (req, res) => {
  console.log(req.body);
  const mailInput = req.body.email;
  const passwordInput = req.body.password;

  connection
    .query(`SELECT * FROM users WHERE email= ? and pasword =?`, [mailInput, passwordInput])
    .then(([results, fields]) => {
      
      if (results.length > 0) {
              
        res.json({
          succes: true,
          userId: results[0].id_user, //nos devuelve el id de la usaria
        });
      } else {
      
        res.json({
          success: false,
          "errorMessage": "Usuaria/o no encontrada/o"
        });
      }
   
    });
});

//endpoint motor de plantillas
server.get('/movie/:movieId', (req, res) => {
  const movieIdParams = req.params.movieId;
  console.log(movieIdParams);
  const foundMovie= "SELECT * FROM movies WHERE id_movie = ?"
  connection
  .query(foundMovie, [movieIdParams])
    .then(([results, fields]) => {
      res.render("movie", results[0]);
  })
})

//Servidor estático
const staticServerPathImages = "./src/public-movies-images";
server.use(express.static(staticServerPathImages));

const staticServerPathWeb = "./src/public-react";
server.use(express.static(staticServerPathWeb));
