import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RegistrationManager } from '../dist/'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RegistrationManager />
    </div>
  )
}

export default App
