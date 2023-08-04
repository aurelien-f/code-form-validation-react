import React, { useState, useRef, useEffect } from "react";
import Modal from "./components/modal";
import InputField from "./components/inputField";

const App = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isValid, setIsValid] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  // Fonction pour ajouter la valeur à l'input et changer de focus
  const handleChange = (e, index) => {
    setErrorMessage("");
    const { value } = e.target;
    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Test si la saisie est bien un nombre
    const isNumberOrEmpty = /^$|^\d+$/.test(value);

    // Si ce n'est pas un nombre on affiche une erreur
    if (!isNumberOrEmpty) {
      setErrorMessage("Veuillez saisir un nombre");
      return;
    }

    // Changement de focus quand on saisie un nombre
    if (value.length === 1 && index < 5 && e.keyCode !== 8) {
      inputRefs.current[index + 1].focus();
    }

    // Test si le code est correct ou non
    if (newCode.every((digit) => digit !== "")) {
      setIsValid(newCode.join("") === "123654");
    } else {
      setIsValid(undefined);
    }
  };

  // Permet de clear le formulaire avec la touche backspace
  const handleKeyDown = (e, index) => {
    setErrorMessage("");
    if (e.keyCode === 8 && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Reset du formulaire quand on ferme la modal
  const handleModalClose = () => {
    setIsValid(undefined);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col justify-center align-center p-4">
      <h1 className="text-2xl font-bold text-center mb-10">
        Saisir votre code de validation
      </h1>
      <div className="flex justify-center align-center">
        {code.map((digit, index) => (
          <InputField
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      {isValid !== undefined && (
        <Modal isValid={isValid} onClose={handleModalClose} />
      )}
      {errorMessage && (
        <div className="text-red-500 mt-2 text-center mt-5">{errorMessage}</div>
      )}
    </div>
  );
};

export default App;
