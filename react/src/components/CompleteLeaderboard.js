import React, { Component } from 'react';
import './ViewPeople.css';
// import UserProfile from './UserProfile'

class CompleteLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/leaderboard');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Complete Leaderboard</h1>
          </header>

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

export default CompleteLeaderboard;
