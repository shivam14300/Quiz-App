import React, { Component } from 'react';
import './ViewPeople.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayerHistory extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/playerhistory/'+ localStorage.getItem("email"));
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
            <h1 className="App-title">Player History</h1>
          </header>

          <table className="table-hover">
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Level</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{  
                return (
                    <tr key = {key}>
                          <td>{item.quizname}</td>
                          {item.level == "1"?<td>Hard</td>:<td>Easy</td>}
                          <td>{item.score}</td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        </div>
      );
  }
}

export default PlayerHistory;
