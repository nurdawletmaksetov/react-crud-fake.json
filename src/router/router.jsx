import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Create from '../components/Create'
import Update from '../components/Update'
import Read from '../components/Read'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/create',
        element: <Create />
    },
    {
        path: '/update/:id',
        element: <Update />
    },
    {
        path: '/read/:id',
        element: <Read />
    }
])