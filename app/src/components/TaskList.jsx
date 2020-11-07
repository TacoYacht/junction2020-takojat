import React, { Fragment, useEffect, useState } from "react";
import * as _ from "underscore";
import classNames from "classnames";

import Checked from "../assets/Checked.svg";
import Unchecked from "../assets/Unchecked.svg";
import { markCompleted, addTask } from "../utils.js";

const eva = require("eva-icons");

function AddNewTask({ user }) {
  const [formData, setFormData] = useState({ name: "", description: "", userId: user.id });

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleAddNewTask(e) {
    e.preventDefault();
    addTask(formData);
  }

  return (
    <div className="new-task-information">
      <form onSubmit={handleAddNewTask}>
        <p>
          <label htmlFor="name">{"Task name"}</label>
          <input type="text" name="name" onChange={handleInput} />
        </p>
        <p>
          <label htmlFor="description">{"Task description"}</label>
          <input type="text" name="description" onChange={handleInput} />
        </p>
        <p>
          <button type="submit">{"Add"}</button>
        </p>
      </form>
    </div>
  )
}

function TaskListItem({ task, onClick }) {
  const [completed, setCompleted] = useState(task.completed === "true");
  const course = task.owner ? task.owner.name : "Course name";

  function markTaskComplete() {
    if (completed) {
      markCompleted(task, false);
      setCompleted(false);
    } else {
      markCompleted(task, true);
      setCompleted(true);
    }
  }

  const checkbox = completed ? <img src={Checked} alt="checked" /> : <img src={Unchecked} alt="unchecked" />;

  return(
    <div className={classNames("task-list-item", { "completed": completed })}>
      <div className="checkbox" onClick={markTaskComplete}>{checkbox}</div>
      <div className="task-info" onClick={onClick}>
        <span>{task.name}</span>
        <span>{course}</span>
        <span>{task.description}</span>
      </div>
      <div className="start-task" onClick={onClick}>
        <i data-eva="play" data-eva-fill="#ff0000" data-eva-animation="pulse" />
        <span>{task.timer}</span>
      </div>
    </div>
  );
}

export function TaskList({ user, tasks, setOpenTask }) {
  const [showAddNew, setShowAddNew] = useState(false);

  function renderNoTasks() {
    return (
      <h2>{"Congratulations! You've done it all."}</h2>
    );
  }

  function renderTasks() {
    return (
      <Fragment>
        <h2>{"Here are your most important tasks for today"}</h2>
        <div className="task-list">
          {_.map(tasks, (task, i) => {
            return (
              <TaskListItem task={task} onClick={() => setOpenTask(task)} key={i} />
            );
          })}
        </div>
      </Fragment>
    )
  }

  return(
    <Fragment>
      <div className="welcome-view">
        <div className="container">
          <h3>{"Hello, " + user.name + "!"}</h3>
          {tasks.length > 0 ? renderTasks() : renderNoTasks()}
        </div>
      </div>
      <div className="add-task">
        <button onClick={() => setShowAddNew(!showAddNew)}>{"Add new"}</button>
        {showAddNew && <AddNewTask user={user} />}
      </div>
    </Fragment>
  );
}
