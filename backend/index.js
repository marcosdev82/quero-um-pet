const express = require('express'); // Corrigido de 'empress' para 'express'
const cors = require('cors');

const app = express();

// Config JSON response (Corrigido 'Confi' para 'Config')
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for images
app.use(express.static('public'));

// Routes (Adicione suas rotas aqui)

// Start server (Adicionei uma mensagem de sucesso)
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
