import React, { useState, Fragment } from "react";
import { TaskTimer } from "./TaskTimer";

export function Task({ task }) {
  const [timerOn, setTimerOn] = useState(false);

  const buttonText = timerOn ? "Stop" : "Start";

  function toggleTimer() {
    setTimerOn(!timerOn);
  }

  return (
    <Fragment>
      <div className="task-view">
          <div className="container">
          <div className="timer">
            <h2>
              <TaskTimer task={task} timerOn={timerOn} />
            </h2>
            <button className="timer-button" onClick={toggleTimer}>
              <h2>{buttonText}</h2>
            </button>
          </div>
          <div className="task-info-box">
            <p>{"Task name: "}{task.name}</p>
            <p>{"Task description: "}{task.description}</p>
            <p>{"Time used for task so far: "}{task.cumulativeTime || 0}{" s"}</p>
          </div>
        </div>
      </div>  
    </Fragment>
  );
}