import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GiphyFetch } from "@giphy/js-fetch-api";
import logo from "./sdalogo.png";
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first: "",
        last: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errors: []
  }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleChange(event) {
    const { user } = { ...this.state };
    const currentState = user;
    const { name, value } = event.target;
    currentState[name] = value;
    this.setState({ user: currentState });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.clearErrorMessages();
    this.setState({errors: []}, ()=> {
      console.log("before errros", this.state);
    const {user} = this.state;
    const invalidFields = this.validateForm();
    this.setState({errors: invalidFields}, ()=> {
      console.log("State", this.state);
      if(this.state.errors.length){
       return;
      }
      this.submitUser(user);
      })
    })
  }
  validateForm(){
    const {user} = this.state;
    const invalid = [];
    const validEmailRegex = RegExp(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/);
    const isEmailValid = validEmailRegex.test(user.email);
    if(!user.first.trim().length) {
      invalid.push({ name:"first", message: "Please Enter First Name"});
    }
    if(!user.last.trim().length) {
      invalid.push({name:"last", message: "Please Enter Last Name"});
    }
    if(!isEmailValid) {
      invalid.push({name:"email", message:"Please Enter A Valid Email"});
    }
    if(user.password.trim().length < 6) {
      invalid.push({name:"password", message:"Passwords must be greater than 6 characters"});
    }
    if(user.password !== user.confirmPassword){
      invalid.push({name: "confirmPassword", message:"Passwords do not match"})
    }
    console.log("INVALID: ",invalid)
    invalid.forEach(err => this.showErrorMessage(err.name, err.message));
    return invalid;
  }
  handleError() {

  }

  showErrorMessage(name, message){
    const field = document.querySelector(`input[name="${name}"]`);
    field.classList.add('error')
    const formDiv = field.parentElement;
    const errorDialog = formDiv.querySelector('.error-message')
    errorDialog.classList.remove('hidden');
    errorDialog.innerHTML = message;
  }
  clearErrorMessages() {
    const formDivs = document.querySelectorAll('.input-field');
    formDivs.forEach(el => {
      const field = el.querySelector('input');
      field.classList.remove('error')
      const errorDialog = el.querySelector('.error-message')
      errorDialog.classList.add('hidden');
    })
  }
  submitUser(user) {
    const {first, last, email, password} = user;
    axios({
      method: 'post',
      url: 'http://localhost:5000/users',
      data: {
        firstName: first,
        lastName: last,
        email,
        password
      }
    }).then(response => {
      console.log(response.data);
    }).catch(err=> {
      // handle error
      throw new Error(err)
  })
}
render() {
  return (
    <div className="container">
    <h1 className="center">
      Sign Up User
    </h1>
    <p className="center">
      Please fill out all fields below and submit to join 7th Date.
    </p>
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
      <input value="hidden" type="hidden" style={{display:'none'}}/>
        <div className="form-field">
          <label htmlFor="first">First Name</label><span className="error-message hidden"></span>
          <input type="text" name="first" onChange={this.handleChange}/>
        </div>
        <div className="form-field input-field">
          <label htmlFor="last">Last Name</label><span className="error-message hidden"></span>
          <input type="text" name="last" onChange={this.handleChange}/>
        </div>
        <div className="form-field input-field">
          <label htmlFor="email">Email Address</label><span className="error-message hidden"></span>
          <input type="text" name="email" onChange={this.handleChange} required/>
        </div>
        <div className="form-field input-field">
          <label htmlFor="password">Password</label><span className="error-message hidden"></span>
          <input type="password" name="password" autoComplete="new-password" onChange={this.handleChange} required/>
        </div>
        <div className="form-field input-field">
          <label htmlFor="confirm-password">Confirm Password</label><span className="error-message hidden"></span>
          <input type="password" name="confirmPassword" autoComplete="new-password" onChange={this.handleChange} required/>
        </div>
        {/* <div className="form-field">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input type="password" name="passwordConfirm" autoComplete="new-password" required/>
        </div> */}
        <div className="form-field">
          <input type="submit" className="primary-btn submit-btn fullspan links"/>
        </div>
          {/* <Link to="/notyetman">
          <button className="primary-btn submit-btn fullspan links">SIGN UP HERE</button>
          </Link> */}

      </form>
    </div>
  );
}

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

