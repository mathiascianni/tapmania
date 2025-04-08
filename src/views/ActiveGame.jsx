import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const ActiveGame = () => {
    const { roomCode } = useParams()
    const [position, setPosition] = useState({ x: 100, y: 100 })
    const [players, setPlayers] = useState({})

    useEffect(() => {
        const channel = supabase
            .channel(`inputs-${roomCode}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'inputs',
                filter: `room_code=eq.${roomCode}`,
            }, (payload) => {
                const action = payload.new.action
                setPosition(prev => {
                    const step = 10
                    switch (action) {
                        case 'up': return { ...prev, y: prev.y - step }
                        case 'down': return { ...prev, y: prev.y + step }
                        case 'left': return { ...prev, x: prev.x - step }
                        case 'right': return { ...prev, x: prev.x + step }
                        default: return prev
                    }
                })
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [roomCode])

    return (
        <div className="w-full h-screen bg-gray-800 relative">
            <div
                className="absolute w-12 h-12 bg-green-500 rounded-md transition-all duration-100"
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            ></div>
        </div>
    )
}

export default ActiveGame