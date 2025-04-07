import { useRoom } from '../hooks/useSupabase'
import { useState } from 'react'

export default function DesktopDisplay() {
  const [roomCode] = useState('ABCD') // Código fijo por ahora
  const { actions } = useRoom(roomCode)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Sala: {roomCode}</h1>
      <div className="mt-4">
        <h2 className="font-semibold">Log de acciones:</h2>
        <ul className="mt-2">
          {actions.map((action, i) => (
            <li key={i}>➡️ {action}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
