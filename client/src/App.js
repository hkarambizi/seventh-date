import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GiphyFetch } from "@giphy/js-fetch-api";
import UserProfile from './components/User/UserProfile/UserProfile';
import UserSignUp from './components/User/UserSignUp/UserSignUp';
import logo from "./sdalogo.png";
import prideflag from "./baker_pride_flag.png";
import "./App.css";

const axios = require('axios');
const gf = new GiphyFetch("eeHrDyybZpjK1Ml0wnl4BsNOrSY1pRnZ");

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
      <img src={prideflag} className="pride-logo" alt="pride flag" />
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="description">Seventh Day Adventist <span className="bold rainbow-text">Gay</span> Dating App</h3>
        <p>The only app you can use in church</p>
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


class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: {images: undefined },
      limit: 100 };
  }
  componentDidMount() {
    this.getGif()
      .then(gif => this.setState({ gif: gif }));
  }

  getGif = async () => {
    try {
      const result = await gf.search("really?", { limit: this.state.limit, type: "gifs", rating: 'r' });
      // console.log(`gif`, result);
      const getRandomIndex = () => {
        return Math.floor(Math.random() * this.state.limit)
      };
      const selectedGif = result.data[getRandomIndex()];
      return selectedGif;
    } catch (error) {
      console.error(`gif error`, error);
    }
  }
  render() {

    if (this.state.gif.images === undefined) {
      return (
        <div>
        <div className="container">
          <p>Loading...</p>
          <a href="https://www.youtube.com/watch?v=ZiE3aVQGf8o" className="center fullspan">
            <button className="primary-btn submit-btn ">CLICK TO SEE OTHERS</button>
          </a>
        </div>
        </div>
          );
    } else {

    return (
      <div>
      <div className="container">
        <img src={this.state.gif.images.downsized_medium.url} className="duh center image" alt="really_image"/>
        <h2 className="center fullspan" style={{color: 'darkred'}}>
          C'mon Bro, I am good. But not that good!
          This app is still under construction until Mateja helps me out. Call or text his cell at 978.407.0600

        </h2>
        <a href="https://www.youtube.com/watch?v=ZiE3aVQGf8o" className="center fullspan">
          <button className="primary-btn submit-btn ">CLICK TO SEE OTHERS</button>
        </a>
      </div>
      </div>
        );
  }
}
};

export default App;

