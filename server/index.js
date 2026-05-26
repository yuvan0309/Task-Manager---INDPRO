const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: isProduction && allowedOrigin ? allowedOrigin : true,
    credentials: true
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
