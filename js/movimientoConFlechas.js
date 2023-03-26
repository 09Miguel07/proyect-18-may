let espacioFlechas = document.getElementById("espacioDeJuego");
let flechas = espacioFlechas.getContext("2d");

const movimiento = 2;
let x = 10;
let y = 10;

let nivel = 1;
let xPollos;
let yPollos;
let positions = [{ xPollos, yPollos }];

let widht = 50;
let height = 50;

let pollo = new Image();
pollo.src = "pollo.png";
pollo.addEventListener("load", dibujarObstaculos);

let teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

const recorrido = (color, xinicial, yincial, xfinal, yfinal) => {
  flechas.beginPath();
  flechas.strokeStyle = color;
  flechas.lineWidht = 3;
  flechas.moveTo(xinicial, yincial);
  flechas.lineTo(xfinal, yfinal);
  flechas.stroke();
  flechas.closePath();
};

//perder;
const lose = (positions) => {
  if (
    x >= positions.xPollos &&
    x <= positions.xPollos + 50 &&
    y >= positions.yPollos &&
    y <= positions.yPollos + 50
  ) {
    alert("perdiste");
    location.reload(true);
  }
};

// movimiento
const dibujarConFlechas = (evento) => {
  switch (evento.keyCode) {
    case teclas.UP:
      if (y > 10) {
        recorrido("white", x, y, x, y - movimiento);
        y = y - movimiento;
      }
      positions.forEach(lose);

      break;
    case teclas.DOWN:
      if (y < 280) {
        y += movimiento;
        recorrido("white ", x, y, x, y + movimiento);
      }
      positions.forEach(lose);

      break;
    case teclas.LEFT:
      if (x > 10) {
        recorrido("white", x, y, x - movimiento, y);
        x = x - movimiento;
      }
      positions.forEach(lose);

      break;
    case teclas.RIGHT:
      if (x < 300) {
        recorrido("white", x, y, x + movimiento, y);
        x += movimiento;
      }
      positions.forEach(lose);

      break;
    default:
      break;
  }

  if (x > 285 && y > 259) {
    alert("Ganaste");
    flechas.fillStyle = "black";
    flechas.fillRect(0, 0, 300, 300);
    flechas.clearRect(0, 0, 300, 300);
    nivel += 1;
    x = 10;
    y = 10;
    dibujarObstaculos();
  }
};
document.addEventListener("keydown", dibujarConFlechas);

// obstaculos
function dibujarObstaculos() {
  let numeroPollos = nivel * 3;
  for (let v = 1; v <= numeroPollos; v++) {
    xPollos = aleatorio(0, 15);
    yPollos = aleatorio(0, 15);
    xPollos = xPollos * 10;
    yPollos = yPollos * 10;

    const posiciones = positions.filter(
      (position) => position.xPollos === xPollos,
      positions.yPollos === yPollos
    )[0];
    if (!posiciones) {
      positions.push({ xPollos, yPollos });
      flechas.drawImage(pollo, xPollos, yPollos, widht, height);
    }
  }
}

// posiciones aleatorio

function aleatorio(min, max) {
  let resultado;
  do {
    resultado = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (resultado > max);

  return resultado;
}
