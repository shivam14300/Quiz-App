import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import UserProfile from './UserProfile'

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        QuizID: 0,
        QuestionName: "",
        Level: "",
        Type: "",
        Cat: "",
        OptionA: "",
        OptionB: "",
        OptionC: "",
        OptionD: "",
        A: "0",
        B: "0",
        C: "0",
        D: "0",
    },
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.TypeChange = this.TypeChange.bind(this);
    this.CatChange = this.CatChange.bind(this);
    this.LevelChange = this.LevelChange.bind(this);
    this.AChange = this.AChange.bind(this);
    this.BChange = this.BChange.bind(this);
    this.CChange = this.CChange.bind(this);
    this.DChange = this.DChange.bind(this);
    this.OptionAChange = this.OptionAChange.bind(this);
    this.OptionBChange = this.OptionBChange.bind(this);
    this.OptionCChange = this.OptionCChange.bind(this);
    this.OptionDChange = this.OptionDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    this.state.formData.QuizID = this.props.id;
    fetch('http://localhost:8080/question', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.context.router.history.push("/NewQuiz");
        });
  } 
  handleChange(event) {
    event.preventDefault();
    this.state.formData.QuestionName = event.target.value;
  }
  TypeChange(event) {
    event.preventDefault();
    this.state.formData.Type = event.target.value;
  }
  LevelChange(event) {
    event.preventDefault();
    this.state.formData.Level = event.target.value;
  }
  CatChange(event) {
    event.preventDefault();
    this.state.formData.Cat = event.target.value;
  }
  AChange(event) {
    event.preventDefault();
    this.state.formData.A = event.target.value;
  }
  BChange(event) {
    event.preventDefault();
    this.state.formData.B = event.target.value;
  }
  CChange(event) {
    event.preventDefault();
    this.state.formData.C = event.target.value;
  }
  DChange(event) {
    event.preventDefault();
    this.state.formData.D = event.target.value;
  }
  OptionAChange(event) {
    event.preventDefault();
    this.state.formData.OptionA = event.target.value;
  }
  OptionBChange(event) {
    event.preventDefault();
    this.state.formData.OptionB = event.target.value;
  }
  OptionCChange(event) {
    event.preventDefault();
    this.state.formData.OptionC = event.target.value;
  }
  OptionDChange(event) {
    event.preventDefault();
    this.state.formData.OptionD = event.target.value;
  }

  render() {
    if(localStorage.getItem("email") == 'admin@admin'){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Create New Question</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Question Statement</label>
                  <input type="text" className="form-control" value={this.state.QuestionName} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                  <p>Type
                    <input type="radio" name = 'Type' value="0" onChange = {this.TypeChange}/>Single Correct
                    <input type="radio" name = 'Type' value="1" onChange = {this.TypeChange}/>Multi correct
                  </p>
              </div>
              <div className="form-group">
                  <p>Level
                    <input type="radio" name = 'Level' value="0" onChange = {this.LevelChange}/>Easy
                    <input type="radio" name = 'Level' value="1" onChange = {this.LevelChange}/>Hard
                  </p>
              </div>
              <div className="form-group">
                  <p>Category
                    <input type="radio" name = 'Cat' value="0" onChange = {this.CatChange}/>Normal
                    <input type="radio" name = 'Cat' value="1" onChange = {this.CatChange}/>Video
                    <input type="radio" name = 'Cat' value="2" onChange = {this.CatChange}/>Image
                  </p>
              </div>
              <div className="form-group">
                  <p>A
                    <input type="text" className="form-control" value={this.state.OptionA} onChange={this.OptionAChange}/>
                    <input type="radio" name = 'A' value="1" onChange = {this.AChange}/>Correct
                    <input type="radio" name = 'A' value="0" onChange = {this.AChange}/>Incorrect
                  </p>
              </div>
              <div className="form-group">
                  <p>B
                    <input type="text" className="form-control" value={this.state.OptionB} onChange={this.OptionBChange}/>
                    <input type="radio" name = 'B' value="1" onChange = {this.BChange}/>Correct
                    <input type="radio" name = 'B' value="0" onChange = {this.BChange}/>Incorrect
                  </p>
              </div>
              <div className="form-group">
                  <p>C
                    <input type="text" className="form-control" value={this.state.OptionC} onChange={this.OptionCChange}/>
                    <input type="radio" name = 'C' value="1" onChange = {this.CChange}/>Correct
                    <input type="radio" name = 'C' value="0" onChange = {this.CChange}/>Incorrect
                  </p>
              </div>
              <div className="form-group">
                  <p>D
                    <input type="text" className="form-control" value={this.state.OptionD} onChange={this.OptionDChange}/>
                    <input type="radio" name = 'D' value="1" onChange = {this.DChange}/>Correct
                    <input type="radio" name = 'D' value="0" onChange = {this.DChange}/>Incorrect
                  </p>
              </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
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

export default NewQuestion;
