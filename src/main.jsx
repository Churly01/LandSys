import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { SupabaseProvider } from './contexts/SupabaseContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider className="w-full h-full">
      <SupabaseProvider>
        <Toaster />
        <App />

      </SupabaseProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
