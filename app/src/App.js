import { useState } from 'react';
import './styles/App.css';
import { MainView } from './components/MainView';

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");

  function handleInput(e) {
    setUsername(e.target.value);
  }

  function submitForm() {
    setUser({ name: username, id: 2 });
  }

  function renderContent() {
    if (user) {
      return <MainView user={user} />
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

  return(
    <article>
      {renderContent()}
    </article>

  )
}

export default App;
