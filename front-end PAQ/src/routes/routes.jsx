import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Vagas from '../pages/Vagas'
import JobDetail from '../pages/JobDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Vagas />,
      },
      {
        path: 'vagas/:id',
        element: <JobDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router