import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { createRoom } from '../api/createRoom'

const Desktop = () => {
    const [rooms, setRooms] = useState([])
    const [roomCode, setRoomCode] = useState(null)
    const [logs, setLogs] = useState([])

    useEffect(() => {
        // Cargar salas actuales
        const fetchRooms = async () => {
            const { data, error } = await supabase.from('rooms').select('*').order('id', { ascending: false })
            if (!error) setRooms(data)
        }

        fetchRooms()

        // Suscribirse a nuevas salas
        const subscription = supabase
            .channel('rooms-realtime')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'rooms',
                },
                (payload) => {
                    console.log('🔔 Nueva sala creada:', payload.new)
                    setRooms((prev) => [payload.new, ...prev])
                }
            )
            .subscribe()

        // Limpiar la suscripción al desmontar
        return () => {
            supabase.removeChannel(subscription)
        }
    }, [])

    useEffect(() => {
        if (!roomCode) return

        const channel = supabase
            .channel(`inputs-${roomCode}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'inputs',
                filter: `room_code=eq.${roomCode}`,
            }, (payload) => {
                console.log('🆕 Acción recibida:', payload.new)
                setLogs((prev) => [...prev, payload.new])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [roomCode])

    const handleCreateRoom = async () => {
        const { data, error } = await createRoom()
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 p-4">
            <button
                onClick={handleCreateRoom}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Crear Sala
            </button>

            <div className="w-full max-w-md">
                <h2 className="text-xl font-bold mb-2">Salas activas:</h2>
                <ul className="bg-white shadow-md rounded-lg p-4 space-y-2">
                    {rooms.map((room) => (
                        <li key={room.id} className="border-b pb-1 last:border-0">
                            Código: <strong>{room.code}</strong>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="bg-white shadow-md rounded-lg p-4 space-y-2">
                {rooms.map((room) => (
                    <li
                        key={room.id}
                        className={`border-b pb-1 last:border-0 cursor-pointer ${room.code === roomCode ? 'text-blue-600 font-semibold' : ''
                            }`}
                        onClick={() => setRoomCode(room.code)}
                    >
                        Código: <strong>{room.code}</strong>
                    </li>
                ))}
            </ul>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Logs de acciones</h2>
                <ul className="space-y-1 text-sm bg-white p-4 rounded shadow">
                    {logs.map((log, idx) => (
                        <li key={idx}>{log.action} ({new Date(log.created_at).toLocaleTimeString()})</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Desktop