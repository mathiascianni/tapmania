// src/api/createRoom.js
import { supabase } from '../supabaseClient'

export async function createRoom() {
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase()

  const { data, error } = await supabase
    .from('rooms')
    .insert([{ code: randomCode }])

  if (error) {
    console.error('Error al crear room:', error)
  } else {
    console.log('Room creada:', data)
  }

  return { data, error }
}
