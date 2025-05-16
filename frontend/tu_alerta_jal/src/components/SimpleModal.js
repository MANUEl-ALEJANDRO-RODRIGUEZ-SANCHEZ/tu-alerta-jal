const SimpleModal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    return (
        <div className="absolute inset-0 w-screen h-screen bg-black/40 grid place-items-center z-50">
            <div className="bg-white w-fit h-fit p-4 rounded-xl flex flex-col gap-7">
                <p className="">{children}</p>
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white rounded-lg p-1 hover:bg-red-700 cursor-pointer"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
export default SimpleModal;
