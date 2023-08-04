import React, { useEffect } from "react";

const Modal = ({ isValid, onClose }) => {
  // Message en fonction de la saisie
  const successMessage = "Code correct!";
  const errorMessage = "Code incorrect!";
  const colorMessage = isValid ? "green" : "red";

  useEffect(() => {
    // Fermeture de la modal quand on clique sur l'écran
    const handleOutsideClick = (event) => {
      if (event.target.closest(".modal-content")) return;
      onClose();
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <p className={`text-${colorMessage}-500 text-xl font-bold text-center`}>
          {isValid ? successMessage : errorMessage}
        </p>
        <div className="flex justify-center">
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
