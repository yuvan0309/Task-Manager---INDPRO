const express = require('express');
const supabase = require('../db/supabase');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.use(verifyToken);

function normalizeTaskPayload(body) {
  return {
    title: typeof body.title === 'string' ? body.title.trim() : '',
    description: typeof body.description === 'string' ? body.description.trim() : '',
    stage: ['todo', 'inprogress', 'done'].includes(body.stage) ? body.stage : 'todo',
    priority: ['low', 'medium', 'high'].includes(body.priority) ? body.priority : 'medium'
  };
}

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch tasks' });
  }

  return res.status(200).json({ tasks: data || [] });
});

router.post('/', async (req, res) => {
  const payload = normalizeTaskPayload(req.body);

  if (!payload.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        ...payload,
        user_id: req.user.id
      }
    ])
    .select('*')
    .single();

  if (error) {
    return res.status(500).json({ message: error.message || 'Failed to create task' });
  }

  return res.status(201).json({ task: data });
});

router.put('/:id', async (req, res) => {
  const payload = normalizeTaskPayload(req.body);

  if (!payload.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(payload)
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .select('*')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(500).json({ message: error.message || 'Failed to update task' });
  }

  if (!data) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json({ task: data });
});

router.delete('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .select('id')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(500).json({ message: error.message || 'Failed to delete task' });
  }

  if (!data) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = router;
