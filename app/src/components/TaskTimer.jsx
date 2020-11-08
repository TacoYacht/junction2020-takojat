import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

import { updateTime } from "../utils.js";

export function TaskTimer({ user, task, timerOn }) {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(25 * 60 * 1000);
  
  function onTimerUpdate({time, duration}) {
    setTime(time);
    setDuration(duration);
  }

  function addTimeForTask() {
    if (!!task) {
      updateTime(user, task, duration - time);
    }
  }

  function onFinish() {
    new Notification("Timer done!");
  }

  return (
    <Timer active={timerOn} duration={duration} onTimeUpdate={onTimerUpdate} onStop={addTimeForTask} onFinish={onFinish}>
      <Timecode time={duration - time} format="mm:ss" />
    </Timer>
  );
}