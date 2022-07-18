import axios from "axios";

axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas").then((response) => {
  console.log(response);
});
