import React, { Fragment, useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

import { updateTime } from "../utils.js";

export function TaskTimer({ user, task, timerOn, loadTasks }) {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(25 * 60 * 1000);

  function onTimerUpdate({time, duration}) {
    setTime(time);
    setDuration(duration);
  }

  async function addTimeForTask() {
    if (!!task) {
      await updateTime(user, task, time);
      await loadTasks();
    }
  }

  function onFinish() {
    addTimeForTask();
    new Notification("Timer done!");
  }

  return (
    <Fragment>
      <Timer active={timerOn} duration={duration} onTimeUpdate={onTimerUpdate} onStop={addTimeForTask} onFinish={onFinish} />
      <Timecode time={duration - time} format="mm:ss" />
    </Fragment>
  );
}