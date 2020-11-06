import React, { useEffect } from "react";
import * as _ from "underscore";
import { Task } from "./Task";

export function TaskList() {
  const list = [{ name: "task 1", description: "task description" }, { name: "task 2", description: "task description" }];

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  })

  async function getDataFromBackend() {
    let response = await fetch("http://localhost:8000/");
    let data = await response.json();
    return data;
  }

  getDataFromBackend().then(data => console.log(data));

  return (
    <div className="task-list">
      <h1>{"This is a list of tasks"}</h1>
      {_.map(list, (task, i) => {
        return (<Task task={task} key={i} />);
      })}
    </div>
  );
}