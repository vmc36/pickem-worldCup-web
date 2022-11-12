import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './providers/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
