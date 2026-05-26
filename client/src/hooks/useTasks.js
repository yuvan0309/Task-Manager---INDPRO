import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    if (!token) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data.tasks || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createTask = async (data) => {
    await api.post('/api/tasks', data);
    await fetchTasks();
  };

  const updateTask = async (id, data) => {
    await api.put(`/api/tasks/${id}`, data);
    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
}
