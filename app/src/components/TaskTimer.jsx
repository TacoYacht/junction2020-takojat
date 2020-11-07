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
      task.timer = task.timer + progress;
    }
  }

  function onFinish() {
    new Notification("Timer done!");
  }

  return (
    <Timer active={timerOn} duration={2500} onTimeUpdate={onTimerUpdate} onStop={addTimeForTask} onFinish={onFinish}>
      <Timecode />
    </Timer>
  );
}