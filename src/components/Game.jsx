import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";

const Game = () => {
  const [sequenceLength, setSequenceLength] = useState(4); 
  const [sequence, setSequence] = useState([]);
  const [userGuess, setUserGuess] = useState("");
  const [showSequence, setShowSequence] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const timeoutRef = useRef(null);

 
  const generateSequence = (length) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 9) + 1); 
    }
    return newSequence;
  };


  const startGame = () => {
    setGameStarted(true);
    const newSequence = generateSequence(sequenceLength);
    setSequence(newSequence);
    setUserGuess("");
    setFeedback("");
    setShowSequence(true); 

  
    timeoutRef.current = setTimeout(() => {
      setShowSequence(false);
    }, 3000); 
  };


  const checkGuess = () => {
    const expectedSequence = sequence.join("");

    if (userGuess === expectedSequence) {
      setFeedback("Correct!");
      setSequenceLength(sequenceLength + 1); 
     
      setTimeout(() => {
        startGame();
      }, 1500);
    } else {
      setFeedback(
        `Incorrect! Correct sequence: ${expectedSequence}`
      );
      setGameStarted(false);
    }
  };

  useEffect(() => {

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div>
      <p className="title">Level: {sequenceLength - 3}</p>
      {!gameStarted ? (
        <button onClick={startGame}>Start game</button>
      ) : (
        <>
          {showSequence ? (
            <div className="game-quest">Remember the number: {sequence.join(" ")}</div> 
          ) : (
            <>
              <InputForm setUserGuess={setUserGuess} checkGuess={checkGuess} />
            </>
          )}
        </>
      )}
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Game;
