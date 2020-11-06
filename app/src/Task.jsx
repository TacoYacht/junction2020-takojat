import React from "react";

export function Task(task) {

  function notify() {
    new Notification("hey there");
  }

  return (
    <div className="task-view">
      <p>{"Task name: "}{task.name}</p>
      <p>{"Task description: "}{task.description}</p>
      <button onClick={notify}>{"Test"}</button>
    </div>
  );
}