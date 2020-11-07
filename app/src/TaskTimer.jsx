import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

import './styles/timer.css';


export function TaskTimer({ task, timerOn }) {
  const [progress, setProgress] = useState(0);

  timerOn = timerOn || false;

  function onTimerUpdate(progress) {
    setProgress(progress);
  }

  function addTimeForTask() {
    task.cumulativeTime = task.cumulativeTime + progress;
  }

  return (
    <Timer active={timerOn} duration={null} onTimeUpdate={onTimerUpdate} onStop={addTimeForTask}>
      <Timecode />
    </Timer>
  );
}