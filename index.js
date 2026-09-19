const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

app.post('/api/usuario', (req, res) => {
  try {
    const { nombre, edad, email, token } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ 
        error: 'Faltan datos obligatorios (nombre o email)' 
      });
    }

    console.log('Datos recibidos:');
    console.log('Nombre:', nombre);
    console.log('Edad:', edad);
    console.log('Email:', email);
    console.log('Token:', token || 'No se envió token');

    res.status(200).json({
      mensaje: 'Datos recibidos correctamente',
      datos: {
        nombre,
        edad,
        email
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});