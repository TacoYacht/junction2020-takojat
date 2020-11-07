import React, { useState, Fragment, useEffect } from "react";
import * as _ from "underscore";

import { getMindfullnessPractices, getActivityBreaks } from "../utils.js";

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
  const [mindfullness, setMindfullness] = useState([]);
  const [breaks, setBreaks] = useState([]);

  useEffect(() => {
    getMindfullnessPractices().then(data => setMindfullness(data));
    getActivityBreaks().then(data => setBreaks(data));
  }, []);

  return (
    <Fragment>
      <div className="take-a-break">
        <div className="container">
          <div className="mindfullness">
            {_.map(mindfullness, (practice, i) => {
              return (
                <Practice practice={practice} key={i} />
              );
            })}
          </div>
          <div className="breaks">
            {_.map(breaks, (practice, i) => {
              return (
                <Practice practice={practice} key={i} />
              );
            })}
          </div>
        </div>
      </div>  
    </Fragment>
  );
}