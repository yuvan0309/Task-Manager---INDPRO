const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db/supabase');

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function isValidPassword(password) {
  return typeof password === 'string' && password.trim().length >= 6;
}

router.post('/register', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;

  if (!email || !isValidPassword(password)) {
    return res.status(400).json({ message: 'Email and password are required, and password must be at least 6 characters' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: passwordHash }])
      .select('id, email')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ message: 'Email already registered' });
      }

      return res.status(500).json({ message: error.message || 'Failed to register user' });
    }

    const token = signToken(data);

    return res.status(201).json({
      token,
      user: data
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;

  if (!email || !isValidPassword(password)) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, data.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(data);

    return res.status(200).json({
      token,
      user: { id: data.id, email: data.email }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to login' });
  }
});

module.exports = router;
