import React, { Fragment, useEffect, useState } from "react";
import * as _ from "underscore";
import classNames from "classnames";
import { TaskTimer } from "./TaskTimer";
import { Header } from './Header';

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
  const [timerOn, setTimerOn] = useState(false);
  const taskCompleted = task.completed === "true";

  function toggleTimer() {
    setTimerOn(!timerOn);
  }
  
  const course = task.owner ? task.owner.name : "Course name";

  return(
    <div className={classNames("task-list-item", { "completed": taskCompleted })} onClick={onClick}>
      <div className={classNames("checkbox", { "completed": taskCompleted })} />
      <div className="task-info">
        <span>{task.name}</span>
        <span>{course}</span>
        <span>{task.description}</span>
      </div>
      <span>{task.cumulativeTime}</span>
      <TaskTimer task={task} />
    </div>
  );
}

export function TaskList({ user }) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [openTask, setOpenTask] = useState(null);
  const [tasks, setTasks] = useState([]);

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

  return (
    <Fragment>
      <div className="header">
        <div className="aalto-logo" />
        <div className="navigation">
          <button onClick={() => setOpenTask(null)}>{"Return to list"}</button>
        </div>
      </div>
      {!openTask && (
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
      )}
      {openTask && <Task task={openTask} />}
    </Fragment>
  );
}