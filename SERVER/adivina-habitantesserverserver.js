const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, 'ranking.json');
let numeroSecreto = generarNumero();
let ranking = cargarRanking();

function generarNumero() {
  const MIN = 1;
  const MAX = 8100000000;
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function cargarRanking() {
  if (fs.existsSync(FILE)) {
    return JSON.parse(fs.readFileSync(FILE));
  } else {
    return [];
  }
}

function guardarRanking() {
  fs.writeFileSync(FILE, JSON.stringify(ranking, null, 2));
}

app.get('/api/numero', (req, res) => {
  res.json({ numero: numeroSecreto });
});

app.post('/api/nuevoNumero', (req, res) => {
  numeroSecreto = generarNumero();
  res.json({ numero: numeroSecreto });
});

app.get('/api/ranking', (req, res) => {
  res.json(ranking);
});

app.post('/api/ranking', (req, res) => {
  const { nombre, intentos } = req.body;
  ranking.push({ nombre, intentos });
  ranking.sort((a, b) => a.intentos - b.intentos);
  guardarRanking();
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
