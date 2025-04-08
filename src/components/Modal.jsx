import { motion, AnimatePresence } from "motion/react";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Fondo oscuro */}
                    <motion.div
                        className="fixed inset-0 bg-slate-800/90 bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* Modal */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white p-6 rounded-sm shadow-xl w-[90%] max-w-md"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {children}
                        <button
                            onClick={onClose}
                            className="w-10 h-10 absolute -right-3 transition-all -top-3 bg-red-500 cursor-pointer text-white rounded-sm hover:bg-red-600"
                        >
                            ✖
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;