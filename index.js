const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const existe = new Set();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de logs
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

app.post('/api/usuario', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        error: 'Faltan datos obligatorios (token)' 
      });
    }
    
    if (existe.has(token)) {
      console.log(`El token ${token} ya fue registrado anteriormente`);
      return res.status(409).json({
        error: 'Token ya registrado',
        mensaje: 'Este Token ya fue enviado antes'
      });
    }
    
    existe.add(token);

    console.log('Datos recibidos ✅✅✅');
    console.log('token:', token);

    res.status(200).json({
      mensaje: 'Datos recibidos correctamente',
      datos: {
        token
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