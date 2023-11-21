import { useState } from "react";
import { IGameStatuses } from "../Game";

interface GuessInputProps {
  handleSubmitGuess : (guess: string) => void;
  gameStatus: IGameStatuses
}

function GuessInput({
  handleSubmitGuess,
  gameStatus,
}: GuessInputProps) {
  const [guessInput, setGuessInput] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitGuess(guessInput);


    setGuessInput('');
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleFormSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={gameStatus !== 'running'}
        type="text"
        id="guess-input"
        minLength={5}
        maxLength={5}
        pattern="[A-Za-z]+"
        title="Please enter a 5 letter word"
        value={guessInput}
        onChange={(event) => setGuessInput(event.target.value.toLocaleUpperCase())}
      />
    </form>
  );
}

export default GuessInput;
