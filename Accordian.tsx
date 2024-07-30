import * as React from "react";
import "./accordian.css";

export const accordians = [
  {
    title: "table row 1",
    content: "I want to do well"
  },
  {
    title: "table row 2",
    content: "I want to do very well"
  },
  {
    title: "table row 3",
    content: "I want to do vry vry well"
  },
  {
    title: "table row 4",
    content: "I want to do vry vry very well"
  }
]

export const Accordian = ({ accordians }) => {
  const [expandedStatus, setExpandedStatus] = React.useState(new Array(accordians?.length).fill(false));

  const onHandleClick = (index) => {
    const oldState = [...expandedStatus];
    const indexStatus = oldState[index];
    oldState[index] = !indexStatus;
    setExpandedStatus([...oldState]);
  }


  return (
    <div className="accordian">
      {
        accordians.map((acc, index) => (
          <div
            key={acc?.title}
            className={expandedStatus[index] ? "acc-expanded-card" :"acc-card"}
          >
            <div className="acc-header">
              <span>{acc?.title}</span>
              <button
                className={expandedStatus[index] ? "down" : "up"}
                onClick={() => onHandleClick(index)}
              >
                v
              </button>
            </div>

            <div className={expandedStatus[index] ? "display-content" : "hide-content"}>
              <p>{acc?.content}</p>
            </div>
          </div>
        ))
      }
    </div>
  )

}
