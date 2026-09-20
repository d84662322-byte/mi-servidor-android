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
    const { key, value, id } = req.body;

    if (!key || !value) {
      return res.status(400).json({ 
        error: 'Faltan datos obligatorios (key o value)' 
      });
    }

    console.log('Datos recibidos ✅✅✅');
    console.log('key:', key);
    console.log('value:', value);
    console.log('id:', id);

    res.status(200).json({
      mensaje: 'Datos recibidos correctamente',
      datos: {
        key,
        value,
        id
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