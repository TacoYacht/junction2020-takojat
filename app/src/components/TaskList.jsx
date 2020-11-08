import React, { Fragment, useState, useEffect } from "react";
import * as _ from "underscore";
import classNames from "classnames";
import Timecode from "react-timecode";

import Checked from "../assets/Checked.svg";
import Unchecked from "../assets/Unchecked.svg";
import Plus from "../assets/plus.svg";
import MockCourseSelect from "../assets/MockCourseSelect.svg";

import { getTasks, markCompleted, addTask, getCourseByTask } from "../utils.js";

function AddNewTask({ user, onAdd, onCancel }) {
  const [formData, setFormData] = useState({ name: "", description: "", userId: user.id });

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleAddNewTask(e) {
    e.preventDefault();
    addTask(formData);
    onAdd();
    onCancel();
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

function TaskListItem({ user, task, onClick, loadTasks }) {
  const [completed, setCompleted] = useState(task.completed === 1);

  function markTaskComplete() {
    if (completed) {
      markCompleted(user, task, 0);
      setCompleted(false);
    } else {
      markCompleted(user, task, 1);
      setCompleted(true);
    }

    loadTasks();
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

export function TaskList({ user, setOpenTask }) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([]);

  const hasTasks = allTasks.length > 0;
  const message = hasTasks ? "Here are your most important tasks for today" : "Congratulations! You've done it all."; 
  
  useEffect(() => {
    loadTasks();
  }, [user])

  useEffect(() => {
    setCompletedTasks(_.filter(allTasks, task => { return task.completed === 1 }));
    setUnfinishedTasks(_.filter(allTasks, task => { return task.completed === 0 }));
  }, [allTasks])

  function loadTasks() {
    getTasks(user).then(data => setAllTasks(data))
  }

  const completedTasksCount = completedTasks.length;
  const hasFinishedTasks = completedTasksCount > 0;
  const completedMessage = hasFinishedTasks ? "You have already completed " + completedTasksCount + " tasks!" : "";

  function renderTasks() {
    return (
      <Fragment>
        <div className="task-list">
          {_.map(unfinishedTasks, (task, i) => {
            return (
              <TaskListItem user={user} task={task} loadTasks={loadTasks} onClick={() => setOpenTask(task)} key={i} />
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
          {_.map(completedTasks, (task, i) => {
            return (
              <TaskListItem user={user} task={task} loadTasks={loadTasks} onClick={() => {}} key={i} />
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
              {showAddNew && <AddNewTask user={user} onAdd={loadTasks} onCancel={() => setShowAddNew(false)} />}
            </div>
            {hasTasks && renderTasks()}
          </div>
          <div className="right-column">
            <h4>{completedMessage}</h4>
            {hasFinishedTasks && renderFinishedTasks()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
