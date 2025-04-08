import { supabase } from '../supabaseClient'

/**
 * Crea una sala en la base de datos con un código aleatorio
 * y devuelve un objeto con el resultado de la operación.
 *
 * @returns {Object} Un objeto con dos propiedades:
 *   - `data`: Un array con un solo objeto que contiene la
 *     información de la sala creada.
 *   - `error`: Un objeto con la información del error si
 *     ocurre alguno.
 */
export async function createRoom() {
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()

  const { data, error } = await supabase
    .from('rooms')
    .insert([{ code: randomCode }])
    .select();

  if (error) {
    console.error('Error al crear room:', error)
  } else {
    console.log('Room creada:', data)
  }

  return { data, error }
}
