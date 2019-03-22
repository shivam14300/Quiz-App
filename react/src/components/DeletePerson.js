import React, { Component } from 'react';
import './DeletePerson.css';
import PropTypes from 'prop-types';

class DeletePerson extends Component {
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
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleRemove= (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/people/' + this.state.Opt, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          this.context.router.history.push("/ViewPeople");
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
            <h1 className="App-title">Delete Person</h1>
          </header>
          <form onSubmit = {this.handleRemove}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item,key)=>{  
                return (
                    <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
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
        <h1>You are not Admin</h1>
      );
    }
  }
}
  
export default DeletePerson;
