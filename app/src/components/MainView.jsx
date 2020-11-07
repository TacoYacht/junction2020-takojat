import React, { Fragment, useEffect, useState } from "react";
import * as _ from "underscore";
import classNames from "classnames";
import AaltoLogo from "../assets/A_.png";

import { Task } from "./Task";

function AddNewTask({ user }) {
  const [formData, setFormData] = useState({ name: "", description: "", userId: user.id });

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleAddNewTask(e) {
    e.preventDefault();
    const XHR = new XMLHttpRequest();

    let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for( name in formData ) {
      urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( formData[name] ) );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to 
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

    XHR.addEventListener( 'load', function(event) {
      alert( 'Yeah! Data sent and response loaded.' );
    } );

    XHR.addEventListener( 'error', function(event) {
      alert( 'Oops! Something went wrong.' );
    } );

    XHR.open( 'POST', 'http://localhost:8000/tasks' );
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    XHR.send( urlEncodedData );
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
  const taskCompleted = task.completed === "true";
  const course = task.owner ? task.owner.name : "Course name";

  return(
    <div className={classNames("task-list-item", { "completed": taskCompleted })} onClick={onClick}>
      <div className={classNames("checkbox", { "completed": taskCompleted })} />
      <div className="task-info">
        <span>{task.name}</span>
        <span>{course}</span>
        <span>{task.description}</span>
      </div>
      <div>{task.cumulativeTime}</div>
    </div>
  );
}

function TaskList({ tasks }) {
  const [showAddNew, setShowAddNew] = useState(false);

  return(
    <Fragment>
      <div className="welcome-view">
        <div className="container">
          <h3>{"Hello, " + user.name + "!"}</h3>
          <h2>{"Here are your most important tasks for today"}</h2>
          <div className="task-list">
            {_.map(tasks, (task, i) => {
              return (
                <TaskListItem task={task} onClick={() => setOpenTask(task)} key={i} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="add-task">
        <button onClick={() => setShowAddNew(!showAddNew)}>{"Add new"}</button>
        {showAddNew && <AddNewTask user={user} />}
      </div>
    </Fragment>
  );
}

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

    getTasks();
  }, [])

  async function getTasks() {
    let url = new URL("http://localhost:8000/getTasks");
    let params = { userId: user.id };
    url.search = new URLSearchParams(params).toString();

    let response = await fetch(url);
    let data = await response.json();

    setTasks(data);
  }

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
      {showTaskList && <TaskList tasks={tasks} />}
      {openTask && <Task task={openTask} />}
      {showTimer && <Task task={null} />}
    </Fragment>
  );
}