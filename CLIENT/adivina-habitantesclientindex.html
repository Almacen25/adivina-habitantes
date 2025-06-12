<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Adivina la población</title>
  <style>
    body { font-family: Arial; text-align: center; margin: 50px auto; max-width: 600px; background-color: #f0f0f0; }
    input, button { font-size: 1rem; padding: 10px; margin: 5px; }
    #mensaje { margin-top: 20px; font-size: 1.2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; background-color: white; }
    th, td { border: 1px solid #aaa; padding: 8px; }
    th { background-color: #ddd; }
  </style>
</head>
<body>
  <h1>🌎 Adivina la población del planeta</h1>
  <p>Estoy pensando en un número entre 1 y 8,100,000,000</p>

  <input type="text" id="nombre" placeholder="Tu nombre" />
  <input type="number" id="intento" placeholder="Tu número" />
  <button onclick="verificar()">Adivinar</button>

  <p id="mensaje"></p>
  <p id="intentos">Intentos: 0</p>

  <h2>🏆 Ranking Global</h2>
  <table id="tabla">
    <thead><tr><th>Jugador</th><th>Intentos</th></tr></thead>
    <tbody></tbody>
  </table>

  <script>
    const API_URL = 'http://localhost:3000/api';
    let numeroSecreto;
    let conteoIntentos = 0;

    async function cargarNumero() {
      const res = await fetch(`${API_URL}/numero`);
      const data = await res.json();
      numeroSecreto = data.numero;
    }

    async function cargarRanking() {
      const res = await fetch(`${API_URL}/ranking`);
      const data = await res.json();
      const tbody = document.querySelector("#tabla tbody");
      tbody.innerHTML = '';
      data.forEach(({ nombre, intentos }) => {
        const fila = tbody.insertRow();
        fila.insertCell(0).textContent = nombre;
        fila.insertCell(1).textContent = intentos;
      });
    }

    async function verificar() {
      const nombre = document.getElementById("nombre").value.trim();
      const valor = parseInt(document.getElementById("intento").value);
      const mensaje = document.getElementById("mensaje");
      const contador = document.getElementById("intentos");

      if (!nombre || isNaN(valor)) {
        mensaje.textContent = "Completa todos los campos correctamente.";
        return;
      }

      conteoIntentos++;
      contador.textContent = `Intentos: ${conteoIntentos}`;

      if (valor < numeroSecreto) {
        mensaje.textContent = "🔻 Demasiado bajo.";
      } else if (valor > numeroSecreto) {
        mensaje.textContent = "🔺 Demasiado alto.";
      } else {
        mensaje.textContent = `🎉 ¡Correcto, ${nombre}! Lo lograste en ${conteoIntentos} intentos.`;
        await fetch(`${API_URL}/ranking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, intentos: conteoIntentos })
        });
        await cargarRanking();
      }
    }

    window.onload = async () => {
      await cargarNumero();
      await cargarRanking();
    };
  </script>
</body>
</html>
