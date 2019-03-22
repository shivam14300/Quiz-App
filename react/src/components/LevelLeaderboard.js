import React, { Component } from 'react';
import './ViewPeople.css';

class LevelLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/levelleaderboard/'+this.props.lvl);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Level Leaderboard</h1>
          </header>
          {this.props.lvl == "1"?<h1>Hard Quiz</h1>:<h1>Easy Quiz</h1>}
          <table className="table-hover">
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.quizname}</td>
                        <td>{item.player}</td>
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

export default LevelLeaderboard;
