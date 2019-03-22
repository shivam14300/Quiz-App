import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import UserProfile from './UserProfile'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        QuizName: "",
      },
      data: [],
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/quiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.context.router.history.push("/Admin");
        });
  } 

  handleChange(event) {
    this.state.formData.QuizName = event.target.value;
  }

  GoToQuiz(event) {
    event.preventDefault();
  }

  render() {
    if(localStorage.getItem("email") == 'admin@admin'){
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">View All Quizzez</h1>
          </header>
          <table className="table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Quiz Name</th>
                <th>Add Question</th>
                <th>Edit Question</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.QuizName}</td>
                        <td><Link to={'/NewQuestion/'+item.id}>Add Question</Link></td>
                        <td><Link to={'/DeleteQuestion/'+item.id}>View/Delete/Update Question</Link></td>
                    </tr>
                )
            })}
            </tbody>
          </table>
          <br/><br/>
          <div className="formContainer">
            <h2>Create New Quiz</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Quiz Name</label>
                  <input type="text" className="form-control" value={this.state.QuizName} onChange={this.handleChange}/>
              </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      );
    }
    else{
      return(
        <h1>You are not admin</h1>
      );
    }
  }
}

export default NewQuiz;
