//Hooks
import { useState, useEffect } from "react";

// Components
import LavaBackground from "./LavaBackground";
import Modal from "./Modal";
import TimerBar from "./TimeBar";

//Supabase
import { createRoom } from "../api/createRoom";
import { deleteRoom } from "../api/deleteRoom";

export default function DesktopDisplay() {
  const duration = 60;
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      if (roomCode) {
        await deleteRoom(roomCode);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomCode]);

  /**
   * Crea una sala en la base de datos y muestra el modal
   * con el código de la sala recién creada.
   * 
   * Si ocurre un error al crear la sala, no hace nada.
   * 
   * @async
   * @function
   */
  const handleCreateRoom = async () => {
    const { data, error } = await createRoom();
    if (data && !error) {
      setShowModal(true);
      setRoomCode(data[0].code); // Guardamos el código de la sala creada
    }
  }

  /**
   * Cierra el modal y, si existe, elimina la sala actual y
   * reinicia el estado de la sala.
   * 
   * Se utiliza cuando se acaba el tiempo de la sala.
   */
  const handleTimerEnd = async () => {
    if (roomCode) {
      await deleteRoom(roomCode);
    }
    setShowModal(false);
    setRoomCode(null);
  }

  /**
   * Cierra el modal y, si existe, elimina la sala actual y
   * reinicia el estado de la sala.
   */
  const handleCloseModal = async () => {
    if (roomCode) {
      await deleteRoom(roomCode);
      setRoomCode(null);
    }
    setShowModal(false);
  };

  return (
    <div className="main-font">
      <LavaBackground />
      <div className="w-full h-screen bg-slate-800/50 flex items-center flex-col justify-center">
        <h1 className="text-6xl font-bold text-white uppercase">Bienvenido a Tapmanía</h1>
        <button onClick={handleCreateRoom} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Crear sala</button>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal} >
        <div className="text-center">
          <p className="mb-2">Tu sala está creada ✅</p>
          <p className="text-sm text-gray-400 mb-4">código de la sala</p>
          <p className="text-2xl font-bold mb-4">{roomCode}</p>
        </div>
        <p className="mb-2">Tiempo hasta que se cierre la sala:</p>
        <TimerBar duration={duration} onEnd={handleTimerEnd} />
      </Modal>
    </div>
  )
}
