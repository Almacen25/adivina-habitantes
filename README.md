<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Adivina el número</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: url('https://images.unsplash.com/photo-1527333656061-9b1c00a2678b?auto=format&fit=crop&w=1470&q=80') no-repeat center center fixed;
      background-size: cover;
      margin: 50px auto;
      max-width: 600px;
      color: #ffffff;
      text-shadow: 1px 1px 2px black;
    }
    input, button {
      font-size: 1rem;
      padding: 10px;
      margin: 5px;
    }
    #mensaje {
      margin-top: 20px;
      font-size: 1.2rem;
    }
    #leyenda {
      margin-top: 10px;
      font-size: 1rem;
      color: yellow;
      font-weight: bold;
    }
    #reiniciar {
      margin-top: 30px;
      font-size: 0.9rem;
      color: gray;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
    }
    #reiniciar:hover {
      color: white;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
      background-color: rgba(0, 0, 0, 0.5);
    }
    th, td {
      border: 1px solid #aaa;
      padding: 8px;
      color: white;
    }
    th {
      background-color: rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body>
  <h1>🎯 Adivina el número</h1>
  <p>Estoy pensando en un número entre <strong>1 y 1,000,000</strong>. ¿Puedes adivinarlo?</p>

  <input type="text" id="nombre" placeholder="Tu nombre" />
  <input type="number" id="intento" placeholder="Tu número" />
  <button onclick="verificar()">Adivinar</button>

  <p id="mensaje"></p>
  <p id="intentos">Intentos: 0</p>
  <p id="leyenda"></p>
  <button id="reiniciar" onclick="generarNuevoNumero()">Nuevo número secreto</button>

  <!-- Tabla de puntuaciones -->
  <h2>🏆 Mejores Jugadores</h2>
  <table id="tablaPuntajes">
    <thead>
      <tr>
        <th>Jugador</th>
        <th>Intentos</th>
      </tr>
    </thead>
    <tbody>
      <!-- Aquí se agregarán las filas -->
    </tbody>
  </table>

  <!-- Confetti -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>

  <script>
    let numeroSecreto;
    let conteoIntentos = 0;

    function generarNuevoNumero() {
      numeroSecreto = Math.floor(Math.random() * 1000000) + 1;
      conteoIntentos = 0;
      document.getElementById("mensaje").textContent = "🔁 Número secreto reiniciado. ¡Intenta adivinar el nuevo!";
      document.getElementById("intentos").textContent = "Intentos: 0";
      document.getElementById("intento").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("leyenda").textContent = "";
      document.getElementById("intento").focus();
    }

    function verificar() {
      const nombre = document.getElementById("nombre").value.trim();
      const valor = parseInt(document.getElementById("intento").value);
      const mensaje = document.getElementById("mensaje");
      const contador = document.getElementById("intentos");
      const leyenda = document.getElementById("leyenda");

      if (!nombre) {
        mensaje.textContent = "🪪 Escribe tu nombre antes de jugar.";
        return;
      }

      if (isNaN(valor)) {
        mensaje.textContent = "❌ Por favor, escribe un número válido.";
        return;
      }

      conteoIntentos++;
      contador.textContent = `Intentos: ${conteoIntentos}`;

      if (valor < numeroSecreto) {
        mensaje.textContent = "🔻 Muy bajo. Intenta otra vez.";
      } else if (valor > numeroSecreto) {
        mensaje.textContent = "🔺 Muy alto. Intenta otra vez.";
      } else {
        mensaje.textContent = `🎉 ¡Correcto, ${nombre}! El número era ${numeroSecreto}. Lo lograste en ${conteoIntentos} intentos.`;
        agregarAlaTabla(nombre, conteoIntentos);
        verificarSiEsRecord(conteoIntentos);
        lanzarConfeti();
      }

      document.getElementById("intento").value = "";
      document.getElementById("intento").focus();
    }

    function lanzarConfeti() {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    function agregarAlaTabla(nombre, intentos) {
      const tabla = document.getElementById("tablaPuntajes").getElementsByTagName("tbody")[0];
      const fila = tabla.insertRow();
      fila.insertCell(0).textContent = nombre;
      fila.insertCell(1).textContent = intentos;

      let filas = Array.from(tabla.rows);
      filas.sort((a, b) => parseInt(a.cells[1].textContent) - parseInt(b.cells[1].textContent));
      filas.forEach(f => tabla.appendChild(f));
    }

    function verificarSiEsRecord(intentos) {
      const tabla = document.getElementById("tablaPuntajes").getElementsByTagName("tbody")[0];
      const leyenda = document.getElementById("leyenda");
      const filas = Array.from(tabla.rows);
      if (filas.length > 1) {
        const mejor = parseInt(filas[0].cells[1].textContent);
        if (intentos <= mejor) {
          leyenda.textContent = "🏆 ¡Nuevo récord! Has superado al mejor jugador.";
        } else {
          leyenda.textContent = "";
        }
      } else {
        leyenda.textContent = "🎉 ¡Eres el primer jugador registrado!";
      }
    }

    window.onload = generarNuevoNumero;
  </script>
</body>
</html>
