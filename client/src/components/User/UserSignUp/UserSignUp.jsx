import React from "react";
import { withRouter } from 'react-router-dom';
import { submitUser } from "../../../api/users/users";

class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first: "",
        last: "",
        gender: "",
        age: null,
        city:"",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: [],
    };
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
    this.setState({ errors: [] }, () => {
      const { user } = this.state;

        if(!user.city) return;
      const invalidFields = this.validateForm();
      this.setState({ errors: invalidFields }, () => {
        if (this.state.errors.length) {
          return;
        }
        console.log('submitting user...')
        submitUser(user)
        .then(userData => {
           this.props.history.push('/users/' + userData._id);
        })
        .catch((err)=> {
            console.log(err);
        });
      });
    });
  }
  validateForm() {
    const { user } = this.state;
    const invalid = [];
    const validEmailRegex = RegExp(
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
    );
    const isEmailValid = validEmailRegex.test(user.email);
    if (!user.first.trim().length) {
      invalid.push({ name: "first", message: "Please Enter First Name" });
    }
    if (!user.last.trim().length) {
      invalid.push({ name: "last", message: "Please Enter Last Name" });
    }
    if (!isEmailValid) {
      invalid.push({ name: "email", message: "Please Enter A Valid Email" });
    }
    if (user.password.trim().length < 6) {
      invalid.push({
        name: "password",
        message: "Passwords must be greater than 6 characters",
      });
    }
    if (user.password !== user.confirmPassword) {
      invalid.push({
        name: "confirmPassword",
        message: "Passwords do not match",
      });
    }
    console.log("INVALID: ", invalid);
    invalid.forEach((err) => this.showErrorMessage(err.name, err.message));
    return invalid;
  }
  handleError() {}

  showErrorMessage(name, message) {
    const field = document.querySelector(`[name="${name}"]`);
    field.classList.add("error");
    const formDiv = field.parentElement;
    const errorDialog = formDiv.querySelector(".error-message");
    errorDialog.classList.remove("hidden");
    errorDialog.innerHTML = message;
  }
  clearErrorMessages() {
    const formDivs = document.querySelectorAll(".input-field");
    formDivs.forEach((el) => {
      const field = el.querySelector("input");
      field.classList.remove("error");
      const errorDialog = el.querySelector(".error-message");
      errorDialog.classList.add("hidden");
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Sign Up User</h1>
        <p className="center">
          Please fill out all fields below and submit to join 7th Date.
        </p>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <input value="hidden" type="hidden" style={{ display: "none" }} />
          <div className="form-field input-field">
            <label htmlFor="first">First Name</label>
            <span className="error-message hidden"></span>
            <input
              type="text"
              name="first"
              id="first"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-field input-field">
            <label htmlFor="last">Last Name</label>
            <span className="error-message hidden"></span>
            <input
              type="text"
              name="last"
              id="last"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field input-field">
            <label htmlFor="age">Age</label>
            <span className="error-message hidden"></span>
            <input
              type="number"
              name="age"
              id="age"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field ">
            <label htmlFor="gender">Gender</label>
            <span className="error-message hidden"></span>
            <select name="gender" id="gender" onChange={this.handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="none">Non-Binary</option>
            </select>
          </div>

          <div className="form-field input-field">
            <label htmlFor="city">Location (City)</label>
            <span className="error-message hidden"></span>
            <input
              type="text"
              name="city"
              id="city"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field input-field">
            <label htmlFor="email">Email Address</label>
            <span className="error-message hidden"></span>
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-field input-field">
            <label htmlFor="password">Password</label>
            <span className="error-message hidden"></span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-field input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <span className="error-message hidden"></span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              className="primary-btn submit-btn fullspan links"
            />
          </div>
          {/* <Link to="/notyetman">
            <button className="primary-btn submit-btn fullspan links">SIGN UP HERE</button>
            </Link> */}
        </form>
      </div>
    );
  }
}
export default withRouter(UserSignUp);
