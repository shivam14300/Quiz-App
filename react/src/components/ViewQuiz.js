import React, { Component } from 'react';
import './ViewPeople.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">View All Quiz</h1>
          </header>

          <table className="table-hover">
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Easy</th>
                <th>Hard</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{  
                return (
                    <tr key = {key}>
                          <td><Link to={'/QuizPage/'+item.id}>{item.QuizName}</Link></td>
                          <td><Link to={'/EasyQuiz/'+item.id}>Easy Level</Link></td>
                          <td><Link to={'/HardQuiz/'+item.id}>Hard Level</Link></td>
                          <td><Link to={'/PlayEasyQuiz/'+item.id}>Play Easy Level</Link><br/><Link to={'/PlayHardQuiz/'+item.id}>Play Hard Level</Link></td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        </div>
      );
  }
}

export default ViewQuiz;
