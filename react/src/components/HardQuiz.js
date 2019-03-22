import React, { Component } from 'react';
import './ViewPeople.css';

class HardQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/hardquestion/'+this.props.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hard Quiz</h1>
          </header>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Question Statement</th>
                <th>Type</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{  
                return (
                    <tr key = {key}>
                          <td>{item.QuestionName}</td>
                          {item.Type == "1"?<td>Multi</td>:<td>Single</td>}
                          {item.Type == "1"?<td>Multi</td>:<td>Single</td>}
                          {item.Cat == "0" && <td>Normal</td>}
                          {item.Cat == "1" && <td>Video</td>}
                          {item.Cat == "2" && <td>Image</td>}
                    </tr>
                  )
              })}
            </tbody>
        </table>
        </div>
      );
  }
}

export default HardQuiz;
