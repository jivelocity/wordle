import { range } from '@/utils'
import { NUM_OF_GUESSES_ALLOWED } from '@/constants'
import { Guess } from '../Guess'

interface GuessResultProps {
  checkedGuesses: {
    letter: string
    status: string
  }[][]
}

function GuessResult({ checkedGuesses }: GuessResultProps) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((number) => (
        <Guess key={number} checkedGuess={checkedGuesses[number]} />
      ))}
    </div>
  )
}

export default GuessResult
