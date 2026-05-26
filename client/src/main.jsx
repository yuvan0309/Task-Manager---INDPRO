import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1c1c1f',
              color: '#fafafa',
              border: '1px solid #27272a',
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#09090b' }
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#09090b' }
            },
            duration: 3000,
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
