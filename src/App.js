import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GiphyFetch } from "@giphy/js-fetch-api";
import logo from "./sdalogo.png";
import "./App.css";
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
            <SignUp />
          </Route>
          <Route path="/notyetman">
            <Joke />
          </Route>
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
        <h3>Seventh Day Adventist Dating App</h3>
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

function SignUp() {
  return (
    <div className="container">
    <h1 className="center">
      Sign Up User
    </h1>
    <p className="center">
      Please fill out all fields below and submit to join 7th Date.
    </p>
      <form className="sign-up-form">
      <input value="hidden" type="hidden" style={{display:'none'}}/>
        <div className="form-field">
          <label htmlFor="first">First Name</label>
          <input type="text" name="first"/>
        </div>
        <div className="form-field">
          <label htmlFor="last">Last Name</label>
          <input type="text" name="last"/>
        </div>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input type="text" name="email" required/>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" autoComplete="new-password" required/>
        </div>

          <Link to="/notyetman">
          <button className="primary-btn submit-btn fullspan links">SIGN UP HERE</button>
          </Link>

      </form>
    </div>
  );
}
class Joke extends React.Component {
  constructor() {
    super();
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
        <img src={this.state.gif.images.downsized_medium.url} className="duh center image"/>
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

