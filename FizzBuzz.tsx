import * as React from "react";
import Button from '@mui/material/Button';
import "./fizzBuzz.css"
interface IProps {
  title: string;
  max: number;
}

enum EFzzBuzz {
  Fizz = "fizz",
  Buzz = "buzz",
  FizzBuzz = "fizzBuzz",
}

export const FizzBuzz: React.FC<IProps>  = ({ title, num }) => {
  const [fizzOrBuzz, setFizzOrBizz] = React.useState<string>("");
  const [count, setCount] = React.useState<number>(1);
  const timer = React.useRef();

  const getFizzOrBuzz = (count) => {
    if(count % 3 === 0 && count % 5 === 0) {
      setFizzOrBizz(EFzzBuzz.FizzBuzz)
    } else if(count % 3 === 0) {
      setFizzOrBizz(EFzzBuzz.Fizz)
    } else if (count % 5 === 0) {
      setFizzOrBizz(EFzzBuzz.Buzz)
    } else {
      setFizzOrBizz(1)
    }
  }

  const resetTimer = () => {
    clearInterval(timer.current);
    // setCount(1);
  };

  const setTimer = () => {
    setCount(1)
    timer.current = setInterval(() => {
      setCount((prevTime) => prevTime + 1);
    }, 3000);
  }

  React.useEffect(() => {
    setTimer()
    return () => clearInterval(timer.current);
  },[]);

  React.useEffect(() => {
    console.log("count here", count)
    getFizzOrBuzz(count);
    if(count === num) {
      resetTimer()
    }
  },[count])

  return (
    <div className="fizzBuzz">
      <header>{title}</header>
      <section>
        <p> Count: {count}</p>
        <div className="fizzBuzzDiv">
          <div className={(fizzOrBuzz === EFzzBuzz.Fizz || fizzOrBuzz === EFzzBuzz.FizzBuzz) ? "enlargeFizz" : "normalFizz"} > Fizz </div>
          <div className={(fizzOrBuzz === EFzzBuzz.Buzz || fizzOrBuzz === EFzzBuzz.FizzBuzz) ? "enlargeBuzz" : "normalBuzz"}>Buzz</div>
        </div>
        <div className="buttongroup">
          <Button variant="contained" onClick={setTimer} sx={{ marginRight: "10px"}}>Start Timer</Button>
          <Button variant="contained" onClick={resetTimer}>Stop Timer</Button>
        </div>
      </section>
    </div>
  )
}
