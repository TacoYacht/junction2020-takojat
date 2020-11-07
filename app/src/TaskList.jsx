import React, { Fragment, useEffect, useState } from "react";
import * as _ from "underscore";
import { Task } from "./Task";

function AddNewTask() {
  const [formData, setFormData] = useState({ name: "", description: "" });

  // function handleNameInput(e) {
  //   setFormData(...formData, { name: e.target.value });
  // }

  function handleInput(e) {
    setFormData({...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleAddNewTask(e) {
    e.preventDefault();
    console.log( 'Sending data' );

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

    // Define what happens on successful data submission
    XHR.addEventListener( 'load', function(event) {
      alert( 'Yeah! Data sent and response loaded.' );
    } );

    // Define what happens in case of error
    XHR.addEventListener( 'error', function(event) {
      alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( 'POST', 'http://localhost:8000/' );

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

    // Finally, send our data.
    XHR.send( urlEncodedData );
  }

  return (
    <div className="new-task-information">
      <form onSubmit={handleAddNewTask}>
        <label htmlFor="name">{"Task name"}</label>
        <input type="text" name="name" onChange={handleInput} />
        <label htmlFor="description">{"Task description"}</label>
        <input type="text" name="description" onChange={handleInput} />
        <button type="submit">{"Add"}</button>
      </form>
    </div>
  )
}

export function TaskList() {
  const list = [{ name: "task 1", description: "task description" }, { name: "task 2", description: "task description" }];

  const [showAddNew, setShowAddNew] = useState(false);

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
    <Fragment>
      <div className="task-list">
        <h1>{"This is a list of tasks"}</h1>
        {_.map(list, (task, i) => {
          return (<Task task={task} key={i} />);
        })}
      </div>
      <div className="add-task">
        <button onClick={() => setShowAddNew(!showAddNew)}>{"Add new"}</button>
        {showAddNew && <AddNewTask />}
      </div>
    </Fragment>
  );
}