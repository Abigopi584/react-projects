import * as React from "react";
import {hangmanReducer, initialState} from "./reducer";

export const Hangman = () => {
  const [state, dispatch] = React.useReducer(hangmanReducer, initialState);

  React.useEffect(() => {
    console.log("state?.incomingLetter", state?.incomingLetter);
    if(state?.incomingLetter) {
      updateWrongGuessCtr(state?.incomingLetter);
    }
  },[state?.incomingLetter])

  const handleUpdateGuessWord = (evt) => {
    evt.preventDefault();
    return dispatch(
      {
        type: "updateGuessWord",
        word: evt?.target?.value,
      }
    )
  }

  const updateWrongGuessCtr = (guessedLetter) => {
    return dispatch({
      type: "wrongGuessCtr",
      incomingLetter: guessedLetter
    })
  }

  const updateIncomingLetter = (evt) => {
    console.log("evt", evt.target?.value);
    return dispatch({
      type: "checkIncomingLetter",
      incomingLetter: evt?.target?.value
    })
  }

  return (
    <>
      <div className="intial">
        <h3>Please enter the word to be guessed</h3>
        <input type="text" onChange={handleUpdateGuessWord} disabled={state?.wrongGuessCnt > 6} />
      </div>
      <div>
        <h3>Now let us guess the word</h3>
        <input type="text" onChange={updateIncomingLetter} disabled={state?.wrongGuessCnt >= 6}/>
        <div>Wrong Guess counter: {state?.wrongGuessCnt}</div>
        {state?.wrongGuessCnt >= 6 && <p>Out Of Turns. Start over again</p>}
        <div>
          {state?.wordTobeGuessed?.split("").map((char, index) =>
            <span key={`${char}_${index}`}>{state?.indexes?.includes(index) ? state?.wordTobeGuessed.split("")[index] : "__"} </span>
          )
          }
        </div>
      </div>
    </>
  )

}
