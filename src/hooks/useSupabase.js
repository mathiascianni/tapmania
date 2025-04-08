import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

export function useRoom(roomCode) {
  const [actions, setActions] = useState[""]
  useEffect(() => {
    const channel = supabase.channel(`room-${roomCode}`)
    channel
      .on(
        'broadcast',
        { event: 'input' },
        (payload) => {
          setActions(prev => [...prev, payload.payload.action])
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [roomCode])

  return { actions }
}

export async function sendInput(roomCode, action) {
  await supabase.channel(`room-${roomCode}`).send({
    type: 'broadcast',
    event: 'input',
    payload: { action },
  })
}
