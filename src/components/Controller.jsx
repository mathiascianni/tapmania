// src/Mobile.jsx
import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Controller() {
  const [roomCode, setRoomCode] = useState("")
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)

  const handleJoin = async () => {
    setError(null)
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", roomCode)
      .single()

    if (data) {
      setConnected(true)
      console.log("🟢 Conectado a la sala", data)
      // Acá podrías guardar `roomId`, `userId`, etc.
    } else {
      setError("Código inválido o sala no encontrada.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {!connected ? (
        <div className="w-full max-w-xs bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-xl font-bold mb-4 text-center">Ingresar a la sala</h1>
          <input
            type="text"
            placeholder="Código de sala"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full p-2 border rounded mb-4 text-center"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleJoin}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Unirse
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xs text-center space-y-4">
          <h2 className="text-lg font-bold">¡Conectado a la sala {roomCode}!</h2>
          {/* 👇 Próximo paso: controles */}
          <div className="grid grid-cols-3 gap-2">
            <button className="col-span-3 bg-gray-300 p-4 rounded">⬆️</button>
            <button className="bg-gray-300 p-4 rounded">⬅️</button>
            <div />
            <button className="bg-gray-300 p-4 rounded">➡️</button>
            <div />
            <button className="col-span-3 bg-gray-300 p-4 rounded">⬇️</button>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">🔵 Acción 1</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded">🔴 Acción 2</button>
          </div>
        </div>
      )}
    </div>
  )
}
