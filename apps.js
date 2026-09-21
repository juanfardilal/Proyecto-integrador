// app.js
// Contiene la lógica de la calculadora de volúmenes.
// Guarda cuál es la figura seleccionada actualmente.
// Se inicia con el cubo.



window.figuraActual = "cubo";

// Guarda los valores iniciales de las medidas.
// Se utilizan para hacer los cálculos.
window.params = {
  lado: 5,
  ancho: 4,
  largo: 6,
  radio: 3,
  altura: 8
};

// Contiene las fórmulas de volumen de cada figura.
// Se utiliza para mostrar la fórmula en el HTML.

const formulas = {
  cubo: "V = lado³",
  prisma: "V = ancho × largo × altura",
  cilindro: "V = π × radio² × altura",
  cono: "V = (π × radio² × altura) / 3",
  esfera: "V = (4/3) × π × radio³"
};


// Busca en el HTML los elementos que necesitamos controlar.
// Se hace aquí para poder utilizarlos después en las funciones.
const figura = document.getElementById("figura-select");
const formula = document.getElementById("formula-texto");

const resultado = document.getElementById("seccion-resultado");
const valor = document.getElementById("valor-volumen");
const detalle = document.getElementById("desglose-calculo");

const btnCalcular = document.getElementById("btn-calcular");
const btnRestablecer = document.getElementById("btn-restablecer");


// Busca los campos donde el usuario escribe las medidas.
const lado = document.getElementById("input-lado");
const ancho = document.getElementById("input-ancho");
const largo = document.getElementById("input-largo");
const radio = document.getElementById("input-radio");
const altura = document.getElementById("input-altura");

// Busca los contenedores de cada campo.


// Sirven para mostrar u ocultar las medidas dependiendo de la figura seleccionada.


const campoLado = document.getElementById("campo-lado");
const campoAncho = document.getElementById("campo-ancho");
const campoLargo = document.getElementById("campo-largo");
const campoRadio = document.getElementById("campo-radio");
const campoAltura = document.getElementById("campo-altura");



// FUNCIÓN: actualizarFormulario
// Cambia la fórmula y muestra solamente los campos que necesita la figura seleccionada.


function actualizarFormulario() {

  // Guarda la figura que seleccionó el usuario.
  window.figuraActual = figura.value;
// Cambia la fórmula mostrada en el HTML.
  formula.textContent = formulas[figura.value];


  // Primero oculta todos los campos.
  // Después se muestran solamente los necesarios.
  campoLado.classList.add("hidden");
  campoAncho.classList.add("hidden");
  campoLargo.classList.add("hidden");
  campoRadio.classList.add("hidden");
  campoAltura.classList.add("hidden");


  // Si es cubo, solamente necesita el lado.
  if (figura.value === "cubo") {

    campoLado.classList.remove("hidden");


    // Si es prisma, necesita ancho, largo y altura.
  } else if (figura.value === "prisma") {

    campoAncho.classList.remove("hidden");
    campoLargo.classList.remove("hidden");
    campoAltura.classList.remove("hidden");

    // Cilindro y cono necesitan radio y altura.
  } else if (
    figura.value === "cilindro" ||
    figura.value === "cono"
  ) {

    campoRadio.classList.remove("hidden");
    campoAltura.classList.remove("hidden");


    // La esfera solamente necesita radio.
  } else if (figura.value === "esfera") {

    campoRadio.classList.remove("hidden");
  }
}


// Obtiene las medidas y calcula el volumen dependiendo de la figura seleccionada.
function calcular() {


  // Convierte los valores de los inputs a números.
  // Si no hay un valor válido, utiliza 1.
  window.params.lado = Number(lado.value) || 1;
  window.params.ancho = Number(ancho.value) || 1;
  window.params.largo = Number(largo.value) || 1;
  window.params.radio = Number(radio.value) || 1;
  window.params.altura = Number(altura.value) || 1;


  // Variables donde se guardan:
  // volumen = resultado matemático
  let volumen = 0;
  
  // texto = explicación del cálculo.
  let texto = "";


  // CÁLCULO DEL CUBO
  if (figura.value === "cubo") {

    let l = window.params.lado;

    // Fórmula: lado × lado × lado
    volumen = l * l * l;

    // Guarda el procedimiento que se mostrará en pantalla.
    texto = `${l} × ${l} × ${l} = ${volumen.toFixed(2)} cm³`;


    // CÁLCULO DEL PRISMA
  } else if (figura.value === "prisma") {

    let a = window.params.ancho;
    let b = window.params.largo;
    let h = window.params.altura;

    // Fórmula: ancho × largo × altura
    volumen = a * b * h;

    texto = `${a} × ${b} × ${h} = ${volumen.toFixed(2)} cm³`;


    // CÁLCULO DEL CILINDRO
  } else if (figura.value === "cilindro") {

    let r = window.params.radio;
    let h = window.params.altura;

    // Fórmula: π × radio² × altura
    volumen = Math.PI * r * r * h;

    texto = `π × ${r}² × ${h} = ${volumen.toFixed(2)} cm³`;


    // CÁLCULO DEL CONO
  } else if (figura.value === "cono") {

    let r = window.params.radio;
    let h = window.params.altura;


    // Fórmula: (π × radio² × altura) / 3
    volumen = (Math.PI * r * r * h) / 3;

    texto = `(π × ${r}² × ${h}) / 3 = ${volumen.toFixed(2)} cm³`;


    // CÁLCULO DE LA ESFERA
  } else if (figura.value === "esfera") {

    let r = window.params.radio;


    // Fórmula: (4/3) × π × radio³
    volumen = (4 / 3) * Math.PI * r * r * r;

    texto = `(4/3) × π × ${r}³ = ${volumen.toFixed(2)} cm³`;
  }
// Muestra el resultado con dos decimales.
  valor.textContent = volumen.toFixed(2) + " cm³";
 
 // Muestra el procedimiento utilizado.
  detalle.textContent = texto;
// Quita "hidden" para mostrar la sección del resultado.
  resultado.classList.remove("hidden");
}


// Devuelve la calculadora a sus valores iniciales.
function restablecer() {

  // Vuelve a seleccionar el cubo.
  figura.value = "cubo";

  // Devuelve todas las medidas a sus valores originales.
  lado.value = 5;
  ancho.value = 4;
  largo.value = 6;
  radio.value = 3;
  altura.value = 8;


  // También actualiza los valores guardados en params.
  window.params = {
    lado: 5,
    ancho: 4,
    largo: 6,
    radio: 3,
    altura: 8
  };
// Actualiza los campos que aparecen en pantalla.
  actualizarFormulario();

  // Oculta nuevamente el resultado.
  resultado.classList.add("hidden");
}
// Detecta cuando el usuario cambia de figura.
figura.addEventListener("change", function () {

  // Actualiza los campos y la fórmula.
  actualizarFormulario();

  // Oculta el resultado anterior.
  resultado.classList.add("hidden");
});

// Cuando se pulsa "Calcular Volumen",
// se ejecuta la función calcular().
btnCalcular.addEventListener("click", calcular);

// Cuando se pulsa "Restablecer",
// se ejecuta la función restablecer().
btnRestablecer.addEventListener("click", restablecer);

// Ejecuta la función al cargar la página.
// Así se muestran correctamente los campos del cubo desde el inicio.
actualizarFormulario();
