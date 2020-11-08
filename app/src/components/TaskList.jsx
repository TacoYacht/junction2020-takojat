import React, { Fragment, useState } from "react";
import * as _ from "underscore";
import classNames from "classnames";
import Timecode from "react-timecode";

import Checked from "../assets/Checked.svg";
import Unchecked from "../assets/Unchecked.svg";
import Plus from "../assets/plus.svg";
import MockCourseSelect from "../assets/MockCourseSelect.svg";
import { markCompleted, addTask, getCourseByTask } from "../utils.js";

function AddNewTask({ user, onCancel }) {
  const [formData, setFormData] = useState({ name: "", description: "", userId: user.id });

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleAddNewTask(e) {
    e.preventDefault();
    addTask(formData);
    onCancel()
  }

  return (
    <div className="new-task-information">
      <div className="checkbox"><img src={Unchecked} alt="unchecked" /></div>
      <form onSubmit={handleAddNewTask}>
        <div className="new-task-fields">
          <input type="text" name="name" placeholder="Add name" onChange={handleInput} />
          <img src={MockCourseSelect} alt="Add to course" />
          <input type="text" name="description" placeholder="Add description" onChange={handleInput} />
        </div>
        <button className="cancel" onClick={onCancel}>{"Cancel"}</button>
        <button type="submit">{"Add"}</button>
      </form>
    </div>
  )
}

function TaskListItem({ task, onClick }) {
  const [completed, setCompleted] = useState(task.completed === "true");

  function markTaskComplete() {
    if (completed) {
      markCompleted(task, false);
      setCompleted(false);
    } else {
      markCompleted(task, true);
      setCompleted(true);
    }
  }

  function getCourseForTask() {
    if (task.courseId) {
      let course = getCourseByTask(task.courseId);
      console.log(course);
      return course.name;
    } else {
      return "Own task";
    }
  }

  const checkbox = completed ? <img src={Checked} alt="checked" /> : <img src={Unchecked} alt="unchecked" />;

  return(
    <div className={classNames("task-list-item", { "completed": completed })}>
      <div className="checkbox" onClick={markTaskComplete}>{checkbox}</div>
      <div className="task-info" onClick={onClick}>
        <span>{task.name}</span>
        <span>{getCourseForTask()}</span>
        <span>{task.description}</span>
      </div>
      <div className="start-task" onClick={onClick}>
        <i data-eva="play" data-eva-fill="#ff0000" data-eva-animation="pulse" />
        <Timecode time={task.timer} format="HH:mm:ss" />
      </div>
    </div>
  );
}

export function TaskList({ user, tasks, setOpenTask }) {
  const [showAddNew, setShowAddNew] = useState(false);
  const hasTasks = tasks.length > 0;
  const message = hasTasks ? "Here are your most important tasks for today" : "Congratulations! You've done it all.";

  function getCompletedTasks() {
    return _.filter(tasks, task => task.completed === 1 )
  }

  function getUnfinishedTasks() {
    return _.filter(tasks, task => task.completed === 0 )
  }

  const completedTasksCount = getCompletedTasks().length;
  const hasFinishedTasks = completedTasksCount > 0;


  function renderTasks() {
    return (
      <Fragment>
        <div className="task-list">
          {_.map(getUnfinishedTasks(), (task, i) => {
            return (
              <TaskListItem task={task} onClick={() => setOpenTask(task)} key={i} />
            );
          })}
        </div>
      </Fragment>
    )
  }

  function renderFinishedTasks() {
    return (
      <Fragment>
        <div className="task-list">
          {_.map(getCompletedTasks(), (task, i) => {
            return (
              <TaskListItem task={task} onClick={() => {}} key={i} />
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
          <div className="left-column">
            <h3>{"Hello, " + user.name + "!"}</h3>
            <h2>{message}</h2>
            <div className="add-task">
              <button className="add-button" onClick={() => setShowAddNew(!showAddNew)}>
                <img src={Plus} />
                <span>{"Create new task"}</span>
              </button>
              {showAddNew && <AddNewTask user={user} onCancel={() => setShowAddNew(false)} />}
            </div>
            {hasTasks && renderTasks()}
          </div>
          <div className="right-column">
            <h4>{"You have already completed " + completedTasksCount + " task!"}</h4>
            {hasFinishedTasks && renderFinishedTasks()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
