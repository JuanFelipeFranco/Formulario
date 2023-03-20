export function valida(input){
    //dataset obtiene todos los valores de data, el . es seleccionar que es data-tipo
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML ="";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio",
    },
    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "AL MENOS 6 CARACTERES MAXIMO 12 DEBE CONTENER UNA LETRA MINUSCULA, UNA MAYUSCULA, UN NUMERO Y NO PUEDE CONTENER CARACTERES ESPECIALES"
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "el formato requerido es XXXXXXXXXX (10 NUMEROS)"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 50 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "el estado debe contener entre 10 y 40 caracteres"
    }
};

const validadores = {
    //lo que va dentro del data-tipo, nacimiento es la funcion que recibe de input y va llamar la funcion de validar nacimiento
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

//la funcion recibe nuestro input
function validarNacimiento(input) {
    //necesitamos obtener el valor de la fecha.
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    };
    //DEFINE EL MENSAJE DE VALIDACION PERSONALIZADO PARA EL ELEMENTO SELECCIONADO
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    //console.log(fecha,"----", fechaActual);
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear()+ 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate()
    );
    //SI LA DIFERENCIA ES MAYOR AL AÑO ACTUAL LA PERSONA ES MENOR DE EDAD.
    //console.log(diferenciaFechas);

    return (diferenciaFechas <= fechaActual); 
}