import React, { Component } from 'react';
import './DeletePerson.css';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class DeleteQuestion extends Component {
  constructor() {
    super();
    this.state = {
      Opt: '1',
      data: [],
      submitted: 'false',
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/'+this.props.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleRemove= (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/question/' + this.state.Opt, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          this.context.router.history.push("/Admin");
        }
      });
  }
  handleChange(event) {
    this.state.Opt = event.target.value;
  }
  render() {
    if(localStorage.getItem("email") == 'admin@admin'){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete Question</h1>
          </header>
          <form onSubmit = {this.handleRemove}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Question ID</th>
                <th>Quiz ID</th>
                <th>Question Name</th>
                <th>Type</th>
                <th>Level</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{   
                return (
                    <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.QuizId}</td>
                          <td>{item.QuestionName}</td>
                          {item.Type == "1"?<td>Multi</td>:<td>Single</td>}
                          {item.Level == "1"?<td>Hard</td>:<td>Easy</td>}
                          <td><input type="radio" name = 'gt' value={item.id} onChange = {this.handleChange}/></td>
                          <td><Link to={'/UpdateQuestion/' + this.props.id + '/' + item.id}>Update</Link></td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        <br></br>
        <button>Delete</button>
        </form>
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
  
export default DeleteQuestion;
