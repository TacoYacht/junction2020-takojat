import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";


export function TaskTimer({ task, timerOn }) {
  const [progress, setProgress] = useState(0);

  timerOn = timerOn || false;

  function onTimerUpdate(progress) {
    setProgress(progress);
  }

  function addTimeForTask() {
    if (!!task) {
      task.cumulativeTime = task.cumulativeTime + progress;
    }
  }

  return (
    <Timer active={timerOn} duration={null} onTimeUpdate={onTimerUpdate} onStop={addTimeForTask}>
      <Timecode />
    </Timer>
  );
}