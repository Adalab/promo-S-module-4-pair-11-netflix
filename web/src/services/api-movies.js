// login

const getMoviesFromApi = (param) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(param);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  //se interpola las variables de gender y de sort para buscar por género y orden alfabético
  return fetch(`//localhost:4000/movies?gender=${param.gender}&sort=${param.sort}`)
  .then(response => response.json())
  .then(data => {
     return data;
  });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
