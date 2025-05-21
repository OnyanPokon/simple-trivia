import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AntdConfigProviders, NotificationProvider } from './providers';
import AuthProvider from './providers/AuthProvider';
import CrudModalProvider from './providers/CrudModalProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AntdConfigProviders>
      <CrudModalProvider>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </CrudModalProvider>
    </AntdConfigProviders>
  </StrictMode>
);
