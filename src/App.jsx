// src/App.jsx
import Desktop from "./views/Desktop"
import Mobile from "./views/Mobile"
import { Routes, Route } from "react-router-dom"


function App() {
  return (
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/mobile" element={<Mobile />} />
      </Routes>
  )
}

export default App
