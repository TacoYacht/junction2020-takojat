import React, { Fragment, useState, useEffect } from "react";
import * as _ from "underscore";
import classNames from "classnames";

import { TaskTimer } from "./TaskTimer";

import Checked from "../assets/Checked.svg";
import Unchecked from "../assets/Unchecked.svg";
import CheckboxActive from "../assets/CheckboxActive.svg";
import Plus from "../assets/plus.svg";
import MockCourseSelect from "../assets/MockCourseSelect.svg";

import { getTasks, markCompleted, addTask, getCourseByTask } from "../utils.js";

function AddNewTask({ user, loadTasks, onCancel }) {
  const [formData, setFormData] = useState({ name: "", description: "", userId: user.id });

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  async function handleAddNewTask(e) {
    e.preventDefault();
    await addTask(formData);
    await loadTasks();
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

function TaskListItem({ user, task, loadTasks }) {
  const [active, setActive] = useState(false);
  const completed = task.completed === 1;
  const buttonText = active ? "Stop" : "Start";

  async function markTaskComplete() {
    if (completed) {
      await markCompleted(user, task, 0);
    } else {
      await markCompleted(user, task, 1);
    }
    await loadTasks();
  }

  function toggleTimer() {
    setActive(!active);
  }

  function getCourseForTask() {
    if (task.courseId) {
      let course = getCourseByTask(task.courseId);
      return course.name;
    } else {
      return "Own task";
    }
  }

  function getCheckbox() {
    if (completed) {
      return <img src={Checked} alt="checked" />;
    } else if (active) {
      return <img src={CheckboxActive} alt="active" />;
    } else {
      return <img src={Unchecked} alt="unchecked" />;
    }
  }

  return(
    <div className={classNames("task-list-item", { "completed": completed, "active": active })}>
      <div className="checkbox" onClick={markTaskComplete}>{getCheckbox()}</div>
      <div className="task-info">
        <span>{task.name}</span>
        <span>{getCourseForTask()}</span>
        <span>{task.description}</span>
      </div>
      {!completed && (
        <div className="task-actions">
          {active && <h3><TaskTimer user={user} task={task} timerOn={active} /></h3>}
          <button className="toggle-task" onClick={toggleTimer}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

function Tasks({ user, tasks, loadTasks }) {
  return (
    <Fragment>
      <div className="task-list">
        {_.map(tasks, (task, i) => {
          return (
            <TaskListItem user={user} task={task} loadTasks={loadTasks} key={i} />
          );
        })}
      </div>
    </Fragment>
  )
}

export function TaskList({ user }) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([]);
  const hasTasks = unfinishedTasks.length > 0;
  const message = hasTasks ? "Here are your most important tasks for today" : "Congratulations! You've done it all."; 
  
  useEffect(() => {
    loadTasks();
  }, [user])

  useEffect(() => {
    setCompletedTasks(_.filter(allTasks, task => { return task.completed == 1 }));
    setUnfinishedTasks(_.filter(allTasks, task => { return task.completed == 0 }));
  }, [allTasks])

  async function loadTasks() {
    getTasks(user).then(data => {
      setAllTasks(data);
    });
  }

  const completedTasksCount = completedTasks.length;
  const hasFinishedTasks = completedTasksCount > 0;
  const completedMessage = hasFinishedTasks ? "You have already completed " + completedTasksCount + " task(s)!" : "";

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
              {showAddNew && <AddNewTask user={user} loadTasks={loadTasks} onCancel={() => setShowAddNew(false)} />}
            </div>
            {hasTasks && <Tasks tasks={unfinishedTasks} user={user} loadTasks={loadTasks} />}
          </div>
          <div className="right-column">
            <h4>{completedMessage}</h4>
            {hasFinishedTasks && <Tasks tasks={completedTasks} user={user} loadTasks={loadTasks} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
