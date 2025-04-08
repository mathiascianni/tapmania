// src/App.jsx
import Desktop from "./views/Desktop"
import Mobile from "./views/Mobile"
import ActiveGame from "./views/ActiveGame"
import { Routes, Route } from "react-router-dom"


function App() {
  return (
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/game/:roomCode" element={<ActiveGame />} />
      </Routes>
  )
}

export default App
