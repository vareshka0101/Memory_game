import React, { useState } from "react";

const InputForm = ({ setUserGuess, checkGuess }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setUserGuess(e.target.value);
  };

  return (
    <>
      <input
        className="input-form"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter the numbers"
      />
      <button onClick={checkGuess}>Check</button>
    </>
  );
};

export default InputForm;
