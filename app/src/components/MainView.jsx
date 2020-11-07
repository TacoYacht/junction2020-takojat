import React, { Fragment, useEffect, useState } from "react";
import * as _ from "underscore";
import AaltoLogo from "../assets/A_.svg";

import { getTasks } from "../utils.js";

import { Task } from "./Task";
import { TaskList } from "./TaskList";

export function MainView({ user }) {
  const [openTask, setOpenTask] = useState(null);
  const [view, setView] = useState("tasks");
  const [tasks, setTasks] = useState([]);

  const showTaskList = view === "tasks" && !openTask;
  const showTimer = view === "timer";

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    getTasks(user).then(data => setTasks(data));
  }, [user])

  function openTaskView() {
    setView("tasks");
    setOpenTask(null);
  }

  return (
    <Fragment>
      <div className="header">
        <div className="aalto-logo">
          <img alt="aalto logo" src={AaltoLogo} />
          <span className="essentials">{"essentials"}</span>
        </div>
        <div className="navigation">
          <span onClick={openTaskView}>{"Tasks"}</span>
          <span onClick={() => setView("timer")}>{"Timer"}</span>
          <span onClick={() => setView("break")}>{"Take a break"}</span>
        </div>
      </div>
      {showTaskList && <TaskList user={user} tasks={tasks} setOpenTask={setOpenTask} />}
      {openTask && <Task task={openTask} user={user} />}
      {showTimer && <Task task={null} user={user} />}
    </Fragment>
  );
}