import React, { Component } from 'react';
import './NewPerson.css';
import ViewPeople from './ViewPeople';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.context.router.history.push("/Login");
        });
  } 

  handleFChange(event) {
    event.preventDefault();
    this.state.formData.firstName = event.target.value;
  }
  handleLChange(event) {
    event.preventDefault();
    this.state.formData.lastName = event.target.value;
  }
  handleUChange(event) {
    event.preventDefault();
    this.state.formData.userName = event.target.value;
  }
  handleEChange(event) {
    event.preventDefault();
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    event.preventDefault();
    this.state.formData.password = event.target.value;
  }

  render() {
    if(localStorage.getItem("email") == null){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Signup</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
              </div>
              <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
              </div>
              <div className="form-group">
                  <label>User Name</label>
                  <input type="text" className="form-control" value={this.state.userName} onChange={this.handleUChange}/>
              </div>
              <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
              </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <br/>
            <p>Already Signed Up?</p>
            <Link to={'/Login'}>Login</Link>
          </div>
          {this.state.submitted &&
            <div>
              <h2>
                New person successfully added.
              </h2>
              This has been printed using conditional rendering.
            </div>
          }
        </div>
      );
    }
    else{
      return(
        <div>
            <h1>
                {localStorage.getItem("email")} is already Logged in.
            </h1>
        </div>
    );
    }
  }
}

export default NewPerson;
