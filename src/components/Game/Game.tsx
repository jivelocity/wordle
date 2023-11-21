import { useCallback, useMemo, useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '@/game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '@/constants';


import GuessInput from '../GuessInput';
import GuessResult from '../GuessResult';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';


export type IGuess = {
  id: string;
  word: string;
}

export type IGameStatuses = 'running' | 'won' | 'lost';

export function Game() {
  const [answer, setAnswer] = useState(() => {
    return sample(WORDS);
  });
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [gameStatus, setGameStatus] = useState<IGameStatuses>('running');

  console.info({ answer });

  const handleResetGame = useCallback(() => {
    const nextAnswer = sample(WORDS);

    setAnswer(nextAnswer);
    setGuesses([]);
    setGameStatus('running');
  }, [])

  const handleSubmitGuess = (guessInput: string) => {

    const newGuess = {
      id: crypto.randomUUID(),
      word: guessInput,
    }

    const newGuesses = [...guesses, newGuess];

    if (guessInput === answer) {
      setGameStatus('won');
    } else if(newGuesses.length >= NUM_OF_GUESSES_ALLOWED){
      setGameStatus('lost');
    }

    setGuesses(newGuesses)
  }

  const checkedGuesses = guesses.map((guess) => {
    const checkedGuess = checkGuess(guess.word, answer)

    return checkedGuess
  })

  const banners = useMemo(() => {
    return {
      won: (
        <WonBanner
          handleResetGame={handleResetGame}
          numOfGuesses={guesses.length}
        />
      ),
      lost: <LostBanner answer={answer} handleResetGame={handleResetGame} />,
    }
  }, [guesses.length, answer, handleResetGame])

  return (
    <>
      <GuessResult checkedGuesses={checkedGuesses}  />
      <GuessInput handleSubmitGuess={handleSubmitGuess} gameStatus={gameStatus} />

      {gameStatus !== 'running' && banners[gameStatus]}
    </>
  );

}
