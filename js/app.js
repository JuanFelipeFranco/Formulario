import { valida } from "./validaciones.js";

//selecciona todos los input del indexx html y los devuelve en un arreglo
const inputs = document.querySelectorAll("input");

//le agrega a todos los input del index la funcion adeventlistener blur 
inputs.forEach(input=> {
    //despues de estar en el foco blur le llama la funcion valida
    input.addEventListener("blur", (input)=> {

        valida(input.target)
    });
})