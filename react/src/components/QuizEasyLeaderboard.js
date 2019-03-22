import React, { Component } from 'react';
import './ViewPeople.css';

class QuizEasyLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1: [],
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quizeasyleaderboard/'+this.props.id);
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
            <h1 className="App-title">View All People</h1>
          </header>
          {this.state.data1.map((item,key)=>{
                return(
                    <h1 className="App-title">{item.QuizName}</h1>
                )
            })}
          <table className="table-hover">
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Player</th>
                <th>Level</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.quizname}</td>
                        <td>{item.player}</td>
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

export default QuizEasyLeaderboard;
