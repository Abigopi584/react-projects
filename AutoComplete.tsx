import * as React from "react";
import "./Autocomplete.css";
import { MutableRefObject } from "react";


export const AutoComplete = () => {
  const initialOptions = React.useRef([
    "music",
    "dance",
    "Basketball",
    "artliterature",
    "language",
    "sciencenature",
    "general",
    "fooddrink",
    "peopleplaces",
    "geography",
    "historyholidays",
    "entertainment",
    "toysgames",
    "music",
    "mathematics",
    "religionmythology",
    "sportsleisure",
  ]);
  const [options, setOptions] = React.useState<MutableRefObject<string[]>>(initialOptions);
  const [type, setType] = React.useState("");
  const [triviaQuestions, setTrivia] = React.useState("");

  const getTrivia = React.useCallback(async () => {
    const response = await fetch(`https://api.api-ninjas.com/v1/trivia?category=${type}`, {
      headers: { "X-Api-Key": 'gZc1I1GpaxO0Duft9R07pw==yE0YYJT0zxjMmUJf'
      },
    });
    const json = await response.json();
    console.log("json", json);
    setTrivia(json?.[0])
  },[type])

  React.useEffect(() => {
    if(type?.length > 0) {
      getTrivia();
    }
  },[type]);

  const onChange = (evt) => {
    const value= evt.target.value;
    setType(evt.target.value);
    setOptions(initialOptions?.current?.filter((option) => {
      return (option.toLowerCase())?.indexOf(value.toLowerCase()) !== -1
    }));
  }

  return (
    <div className="autocomplete">
      <div className="name">
        Please enter an option to start trivia
        <div>

          <input type="text" onChange={onChange} value={type}/>
          { (type?.length > 0 && options.length > 0) &&
          <ul>
              <div>
                {options.map((option) =>
                  <li key={option} className="noDots"
                      onClick={(evt) => {
                        console.log("evt", evt);
                        setType( evt.currentTarget.innerText);
                        setOptions([]);
                      }}>
                    {option}
                  </li>)}
              </div>
          </ul>
          }
          {triviaQuestions && type &&
          <>
              <div>
                {type} trivia question for you
                  <p>{triviaQuestions?.question} </p>
                  <p>{triviaQuestions?.answer} </p>
              </div>
          </>
          }



        </div>
      </div>
    </div>

  )

}
