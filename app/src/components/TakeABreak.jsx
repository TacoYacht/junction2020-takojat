import React, { useState, Fragment, useEffect } from "react";
import * as _ from "underscore";

import { getPractices } from "../utils.js";

function Practice({ practice }) {
  function goToPractice() {
    //todo
  }

  return (
    <div className="practice-card">
      <img src={practice.imgpath} alt={practice.name} />
      <span>{practice.title}</span>
      <span>{practice.description}</span>
      <span>{practice.duration}</span>
      <div className="play-practice">
        <button onClick={goToPractice}>{"Play"}</button>
      </div>
    </div>
  );
}

export function TakeABreak({ user }) {
  const [practices, setPractices] = useState([]);

  useEffect(() => {
    getPractices().then(data => setPractices(data));
  }, []);

  return (
    <Fragment>
      <div className="take-a-break">
        <div className="container">
          {_.map(practices, (practice, i) => {
            return (
              <Practice practice={practice} key={i} />
            );
          })}
        </div>
      </div>  
    </Fragment>
  );
}