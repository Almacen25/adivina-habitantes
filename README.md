<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Adivina el número</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: url('https://images.unsplash.com/photo-1527333656061-9b1c00a2678b?auto=format&fit=crop&w=1470&q=80') no-repeat center center fixed;
      background-size: cover;
      margin: 50px auto;
      max-width: 600px;
      color: #fff;
      text-shadow: 1px 1px 2px black;
    }
    input, button {
      font-size: 1rem;
      padding: 10px;
      margin: 5px;
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
  </style>
</head>
<body>

  <h1>🎯 Adivina el número</h1>
  <p>Estoy pensando en un número entre <strong>1 y 10,000</strong>.</p>

  <input type="text" id="nombre" placeholder="Tu nombre" />
  <input type="number" id="intento" placeholder="Tu número" />
  <button onclick="verificar()">Adivinar</button>

  <p id="mensaje"></p>
  <p id="intentos">Intentos: 0</p>
  <p id="leyenda"></p>
  <button onclick="generarNuevoNumero()">Nuevo número secreto</button>

  <h2>🏆 Mejores Jugadores</h2>
  <table id="tablaPuntajes">
    <thead>
      <tr><th>Jugador</th><th>Intentos</th></tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    const BIN_ID = "684b248b8561e97a50232a99";
    const API_KEY = "$2a$10$Ycd4YOJ6NYAnq4FDMeWLDeO.cFvhaDlmzyo1YTkl.JWGmrvPfWb3G";

    let numeroSecreto;
    let conteoIntentos = 0;

    function generarNuevoNumero() {
      numeroSecreto = Math.floor(Math.random() * 10000) + 1;
      conteoIntentos = 0;
      document.getElementById("mensaje").textContent = "Nuevo número generado. ¡A jugar!";
      document.getElementById("intentos").textContent = "Intentos: 0";
      document.getElementById("intento").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("intento").focus();
    }

    async function verificar() {
      const nombre = document.getElementById("nombre").value.trim();
      const valor = parseInt(document.getElementById("intento").value);
      const mensaje = document.getElementById("mensaje");

      if (!nombre || isNaN(valor) || valor < 1 || valor > 10000) {
        mensaje.textContent = "Por favor, ingresa un nombre y un número válido entre 1 y 10,000.";
        return;
      }

      conteoIntentos++;
      document.getElementById("intentos").textContent = `Intentos: ${conteoIntentos}`;

      if (valor === numeroSecreto) {
        mensaje.textContent = `¡Correcto ${nombre}! Adivinaste en ${conteoIntentos} intentos.`;
        await guardarPuntaje(nombre, conteoIntentos);
        mostrarPuntajes();
      } else {
        mensaje.textContent = valor < numeroSecreto ? "Muy bajo." : "Muy alto.";
      }
      document.getElementById("intento").value = "";
      document.getElementById("intento").focus();
    }

    async function guardarPuntaje(nombre, intentos) {
      const data = await obtenerDatos();
      data.push({ nombre, intentos });
      data.sort((a, b) => a.intentos - b.intentos);
      data.splice(10); // Solo guardamos los mejores 10

      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ scores: data })
      });
    }

    async function obtenerDatos() {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { "X-Master-Key": API_KEY }
        });
        const json = await res.json();
        return json.record.scores || [];
      } catch {
        return [];
      }
    }

    async function mostrarPuntajes() {
      const tabla = document.getElementById("tablaPuntajes").getElementsByTagName("tbody")[0];
      tabla.innerHTML = "";
      const data = await obtenerDatos();
      data.forEach(p => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = p.nombre;
        fila.insertCell(1).textContent = p.intentos;
      });
    }

    window.onload = () => {
      generarNuevoNumero();
      mostrarPuntajes();
    }
  </script>

</body>
</html>
