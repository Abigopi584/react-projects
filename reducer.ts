export const initialState = {
  wordTobeGuessed: "",
  incomingLetter: "",
  indexes:[],
  wrongGuessCnt: 0
}

const getIndexedToUpdate = (wordTobeGuessed: string, incomingLetter: string, idxArr: number[]) => {
  return wordTobeGuessed?.length > 0 ? wordTobeGuessed?.split("").reduce((idxArr1, letter, index) => {
    if(letter.toLowerCase() === incomingLetter.toLowerCase() && !idxArr1?.includes(index)) {
      idxArr1.push(index);
    }

    return idxArr1;

  },idxArr) : [];
}

export const hangmanReducer = (state, action) => {
  switch(action.type) {
    case "updateGuessWord": {
      return {
        ...state,
        wordTobeGuessed: action?.word
      }
    }

    case "checkIncomingLetter": {
      return {
        ...state,
        incomingLetter: action?.incomingLetter,
        indexes: getIndexedToUpdate(
          state?.wordTobeGuessed,
          action.incomingLetter,
          state?.indexes
        )
      }
    }

    case "reset": {
      return initialState;
    }

    case "wrongGuessCtr": {
      const isGuessCorrect = state?.wordTobeGuessed?.length > 0 && state?.wordTobeGuessed?.split("").some((lett) => lett === action.incomingLetter);
      return {
        ...state,
        wrongGuessCnt: isGuessCorrect ? state?.wrongGuessCnt : state?.wrongGuessCnt + 1
      }
    }

    default: {
      return state;
    }
  }


}
