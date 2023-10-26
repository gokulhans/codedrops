import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import('preline')
import './index.css'
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
