import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import 'tailwindcss/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
      <main className="bg-beige text-foreground min-h-screen grid place-content-center">
        <App />
      </main>
   </NextUIProvider>
)
