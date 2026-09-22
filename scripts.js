// scripts.js
// Contiene la parte visual de las figuras 3D usando p5.js.

// Variables que controlan la rotación de la figura.
let rotacionX = -0.3;
let rotacionY = 0.5;



// FUNCIÓN PRINCIPAL DEL VISOR 3D
// "p" representa la instancia de p5.js.
function visor3D(p) {

  // CONFIGURACIÓN INICIAL
  // Se ejecuta una sola vez cuando se crea el visor.
  p.setup = function () {

    // Busca en el HTML el espacio donde estará el canvas(linea 169).
    const contenedor = document.getElementById("canvas-container");

    // Tamaño inicial del canvas si encuentra
    let ancho = 500;
    let alto = 450;

    // Si encuentra el contenedor, utiliza su tamaño real.
   
    // Crea el canvas utilizando WEBGL para poder trabajar en 3D.
    const canvas = p.createCanvas(ancho, alto, p.WEBGL);

    // Coloca el canvas dentro del contenedor del HTML.
    canvas.parent("canvas-container");
  };


  // Mover la figura con el mouse
  
  // Permite girar la figura manualmente.
  p.mouseDragged = function () {
// Movimiento horizontal = rotación en Y.
    rotacionY += p.movedX * 0.01;
    // Movimiento vertical = rotación en X.
    rotacionX += p.movedY * 0.01;
  };


  // Dibujar
  // Se ejecuta continuamente y actualiza la escena 3D.
  p.draw = function () {

    // Fondo
    p.background(248, 250, 252);


    // Rotación automática
    rotacionY += 0.008;


    // Rotación de la figura
    p.rotateX(rotacionX);
    p.rotateY(rotacionY);


    // Luces
    // La luz permite apreciar mejor el volumen de las figuras.
    p.ambientLight(150, 170, 210);

    p.directionalLight(
      255, 255, 255,
      0.5, 0.8, -1
    );


    // Color y borde de la figura
    p.fill(59, 130, 246);
    p.stroke(29, 78, 216);
    p.strokeWeight(1.5);


    // Figura seleccionada
    const figura = window.figuraActual || "cubo";


    // Valores
    const params = window.params || {
      lado: 5,
      ancho: 4,
      largo: 6,
      radio: 3,
      altura: 8
    };


    // Tamaño visual
    // Convierte las medidas en un tamaño apropiado para mostrar en el canvas.
    const escala = 22;


    // Cubo
    if (figura === "cubo") {

      let lado = params.lado * escala;

      // Crea el cubo.
      p.box(lado);
    }


    // Prisma rectangular
    else if (figura === "prisma") {

      let ancho = params.ancho * escala;
      let altura = params.altura * escala;
      let largo = params.largo * escala;

      // Crea el prisma con ancho, altura y largo.
      p.box(ancho, altura, largo);
    }


    // Cilindro
    else if (figura === "cilindro") {

      let radio = params.radio * escala;
      let altura = params.altura * escala;

      // Crea el cilindro.
      p.cylinder(radio, altura);
    }


    // Cono
    else if (figura === "cono") {

      let radio = params.radio * escala;
      let altura = params.altura * escala;

      // Crea el cono.
      p.cone(radio, altura);
    }


    // Esfera
    else if (figura === "esfera") {

      let radio = params.radio * escala;

      // Crea la esfera.
      p.sphere(radio);
    }
  };


  // Ajustar tamaño
  p.windowResized = function () {

    const contenedor = document.getElementById("canvas-container");

    // Ajusta el canvas al tamaño disponible.
    if (contenedor) {
      p.resizeCanvas(
        contenedor.clientWidth,
        contenedor.clientHeight
      );
    }
  };
}


// Iniciar visor
// Espera a que todo el HTML esté cargado.
// Después crea el visor 3D.
document.addEventListener("DOMContentLoaded", function () {
  new p5(visor3D);
});