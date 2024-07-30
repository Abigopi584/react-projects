import React from "react";
import "./TicTacToe.css";

const winningPositions = [
  [0, 1, 2], [3,4,5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2,5,8], [0, 4,8], [2,4,6]
];

const TicTacToeInput = ({ onChangeHandler, id }) => {
  return (
    <input key={id} onChange={onChangeHandler} className="tic-tac-toe-input" id={id}/>
  )
}

export const TicTacToe = () => {
  const [squareStatus, setSquareStatus] = React.useState(new Array(9).fill(undefined));
  const [prevLetter, setPrevLetter] = React.useState(null);
  const [declareWinner, setDeclareWinner] = React.useState(undefined);

  const onChangeHandler = (evt: any, index: number) => {
    const letter = evt.target.value;
    if(
      letter.length > 1 ||
      (letter !== 'X' && letter !== 'O') ||
      (!!prevLetter && prevLetter === letter)
    ) {
      evt.preventDefault();
      document.getElementById(`input_${index}`).value = "";
    } else if(!squareStatus[index]) {
      setSquareStatus((status) => {
        status[index] = evt.target.value;
        return [...status];
      });

      setPrevLetter(evt.target.value);
    }
  }

  const checkForWinner = (XorO) => {
    const areThere3BoxesFilled = squareStatus.filter((square) => square === XorO).length >= 3;
    let foundAllMatch = false;

    if(areThere3BoxesFilled) {
      for(let i = 0; i < winningPositions.length; i++) {
        const positions = winningPositions[i];
        let j = i;

        while(j < positions.length) {
          if(squareStatus[j] === XorO) {
            foundAllMatch = true
          } else {
            foundAllMatch = false
          }

          j = j + 1;
        }
        if(foundAllMatch) {
          break;
        }
      }
    }

    if(foundAllMatch) {
      setDeclareWinner(XorO)
    }

    return foundAllMatch;
  }

  React.useEffect(() => {
    const allBoxesFilled = (squareStatus || [])?.every((square) => !!square);
    const areTherethreeX = checkForWinner("X");
    const areTherethreeO = checkForWinner("O");


    if(allBoxesFilled && !areTherethreeX && !areTherethreeO) {
      setDeclareWinner("No One")
    }
  },[squareStatus]);

  return (
    <>
      <header>X O - Tic Tac Toe - O X</header>
      <article>
        <h3>Rules</h3>
        <p>Only X and O are allowed</p>
        <p>Only one letter is allowed</p>
        <p> Winner is declared after all boxes are filled </p>
      </article>
      <main>
        { !!declareWinner &&
        <summary>The winner is {declareWinner}</summary>
        }

        <section>
          <TicTacToeInput id="input_0" onChangeHandler={(evt: any) => onChangeHandler(evt, 0)}/>
          <TicTacToeInput id="input_1" onChangeHandler={(evt: any) => onChangeHandler(evt, 1)}/>
          <TicTacToeInput key="input_2" onChangeHandler={(evt: any) => onChangeHandler(evt, 2)}/>
        </section>
        <section>
          <TicTacToeInput id="input_3" onChangeHandler={(evt: any) => onChangeHandler(evt, 3)}/>
          <TicTacToeInput id="input_4" onChangeHandler={(evt: any) => onChangeHandler(evt, 4)}/>
          <TicTacToeInput id="input_5" onChangeHandler={(evt: any) => onChangeHandler(evt, 5)}/>
        </section>
        <section>
          <TicTacToeInput id="input_6" onChangeHandler={(evt: any) => onChangeHandler(evt, 6)}/>
          <TicTacToeInput id="input_7" onChangeHandler={(evt: any) => onChangeHandler(evt, 7)}/>
          <TicTacToeInput id="input_8" onChangeHandler={(evt: any) => onChangeHandler(evt, 8)}/>
        </section>
      </main>
    </>


  )
}
