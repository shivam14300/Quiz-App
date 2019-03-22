import React, { Component } from 'react';
import './DeletePerson.css';
import PropTypes from 'prop-types';

class DeleteQuiz extends Component {
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
    const request = new Request('http://127.0.0.1:8080/quiz/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleRemove= (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/quiz/' + this.state.Opt, {
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
    event.preventDefault();
    this.state.Opt = event.target.value;
  }
  render() {
    if(localStorage.getItem("email") == 'admin@admin'){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete Quiz</h1>
          </header>
          <form onSubmit = {this.handleRemove}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quiz Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{  
                return (
                    <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.QuizName}</td>
                          <td><input type="radio" name = 'gt' value={item.id} onChange = {this.handleChange}/></td>
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
  
export default DeleteQuiz;
