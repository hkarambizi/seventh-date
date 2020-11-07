import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserProfile from './components/User/UserProfile/UserProfile';
import UserSignUp from './components/User/UserSignUp/UserSignUp';
import logo from "./sdalogo.png";
import "./App.css";

const axios = require('axios');


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/login" className="nav-link">Log In</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Users />
          </Route>
          <Route path="/signup">
            <UserSignUp/>
          </Route>
          <Route path="/users/:userId" component={UserProfile}/>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="description">The <em>Only</em> Seventh Day Adventist Dating App</h3>
        <p><em>The only app you can use in church</em></p>
        <Link to="/signup">
          <button className="primary-btn sign-up">SIGN UP HERE</button>
        </Link>
      </header>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}



export default App;

