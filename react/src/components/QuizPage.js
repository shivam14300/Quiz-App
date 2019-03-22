import React, { Component } from 'react';
import './DeletePerson.css';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class QuizPage extends Component {
  constructor() {
    super();
    this.state = {
      Opt: '1',
      data: [],
      data1: [],
      submitted: 'false',
    }
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/'+this.props.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));

    const request1 = new Request('http://127.0.0.1:8080/quizname/'+this.props.id);
    fetch(request1)
        .then(response => response.json())
        .then(data1 => this.setState({data1: data1}));
    
  }
  render() {
      return (
        <div className="App">
          <header className="App-header">
            {this.state.data1.map((item,key)=>{
                return(
                    <h1 className="App-title">{item.QuizName}</h1>
                )
            })}
          </header>
          <form onSubmit = {this.handleRemove}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Question Name</th>
                <th>Type</th>
                <th>Level</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{
                return (
                    <tr key = {key}>
                          <td>{item.QuestionName}</td>
                          {item.Type == "1"?<td>Multi</td>:<td>Single</td>}
                          {item.Level == "1"?<td>Hard</td>:<td>Easy</td>}
                          {item.Cat == "0" && <td>Normal</td>}
                          {item.Cat == "1" && <td>Video</td>}
                          {item.Cat == "2" && <td>Image</td>}
                    </tr>
                  )
              })}
            </tbody>
        </table>
        <br></br>
        </form>
        </div>
      );
  }
}
  
export default QuizPage;
