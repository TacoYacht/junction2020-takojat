import { useState } from 'react';
import * as _ from "underscore";

import './styles/App.css';
import { getUsers } from "./utils.js";
import { MainView } from './components/MainView';

function App() {
  const [user, setUser] = useState();
  // const [username, setUsername] = useState("");

  // function handleInput(e) {
  //   setUsername(e.target.value);
  // }

  function openApp(user) {
    setUser(user);
  }

  console.log(getUsers())

  function renderContent() {
    if (user) {
      return <MainView user={user} />
    } else {
      return (
        <div className="enter-user">
          {_.map(getUsers(), (user, i) => {
            return(
              <button key={i} onClick={() => openApp(user)}>{user.name}</button>
            );
          })}
        </div>
      );
    }
  }

  return(
    <article>
      {renderContent()}
    </article>

  )
}

export default App;
