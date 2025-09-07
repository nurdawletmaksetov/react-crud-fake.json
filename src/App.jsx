import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
