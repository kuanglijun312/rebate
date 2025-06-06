import './App.css'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { router } from './router'

export default function App() {
  return (
    <div className="h-screen">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  )
}
