// const updateData = (currentObject, newDataObject) => {
//   const currentArrayKeys = Object.keys(currentObject);
//   const newArrayKeys = Object.keys(newDataObject);
//   newArrayKeys.forEach((newArrayKey) => {
//     currentArrayKeys.forEach((currentArrayKey) => {
//       if (newArrayKey === currentArrayKey) {
//         currentObject[currentArrayKey] = newDataObject[newArrayKey];
//       }
//     });
//   });
//   return currentObject;
// };

// console.log(
//   updateData(
//     { name: "Herley", pais: "Brasil", idade: 27 },
//     { pais: "Canadá", idade: 40, estado: "São Paulo" }
//   )
// );

// const input = "3463543524357435435";
// function maskfy(input, showNumber) {
//   const length = input.length;
//   const maxLength = length - showNumber;
//   const newInput = input.slice(maxLength, length);
//   let charCerc = "";
//   for (let i = 0; i < maxLength; i++) {
//     charCerc += "#";
//   }
//   return `${charCerc}${newInput}`;
// }
// const compiled = {
//   input,
//   maskeInput: maskfy(input, 4),
// };

// console.log(compiled);

import axios from "axios";
// import fetch from "node-fetch";

// axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas").then((response) => {
//   console.log(response);
// });
// axios
//   .get("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos")
//   .then((response) => {
//     console.log(response);
//   });
axios
  .get("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3")
  .then((response) => {
    console.log(response);
  });

// const getPeople = async (people) => {
//   const response = await fetch("https://rickandmortyapi.com/api/character");
//   const data = await response.json();
//   const rescued = [];
//   people.forEach((person) => {
//     data.results.forEach((rescuedPerson) => {
//       if (person === rescuedPerson.name) {
//         rescued.push({
//           nome: rescuedPerson.name,
//           genero: rescuedPerson.gender,
//           avatar: rescuedPerson.image,
//           especie: rescuedPerson.species,
//         });
//       }
//     });
//   });
//   return rescued;
// };
// getPeople(["Rick Sanchez", "Morty Smith", "Summer Smith", "Beth Smith", "Jerry Smith"]).then(
//   (results) => {
//     console.log(results);
//   }
// );

// const checkIfTheFirstLetterIsUppercase = (text) => {
//   return text.charAt(0) === text.charAt(0).toUpperCase();
// };
// console.log(checkIfTheFirstLetterIsUppercase("brasil"));
