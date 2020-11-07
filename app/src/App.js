import { useState } from 'react';
import './styles/App.css';
import { TaskList } from './TaskList';

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");

  function handleInput(e) {
    setUsername(e.target.value);
  }

  function submitForm() {
    setUser({ name: username, id: 123 });
  }

  if (user) {
    return <TaskList user={user} />
  } else {
    return (
      <div className="enter-user">
        <form onSubmit={submitForm}>
          <label htmlFor="username">{"Username:"}</label>
          <input name="username" type="text" onChange={handleInput} />
          <button type="submit">{"Enter"}</button>
        </form>
      </div>
    );
  }
}

export default App;
