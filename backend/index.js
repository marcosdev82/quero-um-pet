const express = require('express'); // Corrigido de 'empress' para 'express'
const cors = require('cors');

const app = express(); 

// Config JSON response (Corrigido 'Confi' para 'Config')
app.use(express.json()); 

// Solve CORS
app.use(cors({ credentials: true, origin: '*' }));
// app.use(cors({ credentials: true, origin: 'http://127.0.0.1:3000' })); 

// Public folder for images
app.use(express.static('public')); 

// Routes (Adicione suas rotas aqui)
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes'); 

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes); 

// Start server (Adicionei uma mensagem de sucesso)
app.listen(4000, () => { 
  console.log('Server running on http://127.0.0.1:4000'); // Corrigido para a porta correta
});