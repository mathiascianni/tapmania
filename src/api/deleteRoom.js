import { supabase } from '../supabaseClient'

/**
 * Elimina una sala de la base de datos.
 *
 * @param {string} code Código de la sala a eliminar.
 *
 * @returns {Promise<void>} Promesa que se resuelve cuando la sala ha sido
 *    eliminada correctamente.
 */
export async function deleteRoom(code) {
    const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('code', code)

    if (error) {
        console.error('Error al eliminar room:', error)
    } else {
        console.log('Room eliminada correctamente')
    }
}
