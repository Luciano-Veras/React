import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, { action as actionNuevoCliente } from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPages from './components/ErrorPages'
import EditarClientes, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarClientes'
import { action as actionEliminarCliente } from './components/Cliente'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPages />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: actionNuevoCliente,
        errorElement: <ErrorPages />
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarClientes />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPages />
      },
      {
        path: 'clientes/:clienteId/eliminar',
        action: actionEliminarCliente
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
