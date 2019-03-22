import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'

class PlayEasyQuiz extends Component {
    constructor() {
        super();
        this.state = {
        formData: {
            quizid: "",
            quizname: "",
            level: "",
            player: "",
            score: "",
        },
        points: 0,
        A: "0",
        B: "0",
        C: "0",
        D: "0",
        ptr: 0,
        skip: 1,
        TwoX: 1,
        data: [],
        data1: [],
        submitted: false,
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/easyquestion/'+this.props.id);
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));

        const request1 = new Request('http://127.0.0.1:8080/quizname/'+this.props.id);
        fetch(request1)
            .then(response => response.json())
            .then(data1 => this.setState({data1: data1}));
  
    }
    AChange = (event)=> {
        if(this.state.A == "0")
            this.state.A = "1";
        else if(this.state.A == "1")
            this.state.A = "0";
    }
    BChange = (event)=> {
        if(this.state.B == "0")
            this.state.B = "1";
        else if(this.state.B == "1")
            this.state.B = "0";
    }
    CChange = (event) =>{
        if(this.state.C == "0")
            this.state.C = "1";
        else if(this.state.C == "1")
            this.state.C = "0";
    }
    DChange = (event) => {
        if(this.state.D == "0")
            this.state.D = "1";
        else if(this.state.D == "1")
            this.state.D = "0";
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.A == this.state.data[this.state.ptr].A && this.state.B == this.state.data[this.state.ptr].B && this.state.C == this.state.data[this.state.ptr].C && this.state.D == this.state.data[this.state.ptr].D)
            this.state.points = this.state.points+1;
        else
            this.state.points = this.state.points-1;
        this.setState({ptr: this.state.ptr+1});
    } 
    Retry = (event) => {
        this.context.router.history.push("/ViewQuiz");
    }
    Submit = (event) => {
        event.preventDefault();
        
        this.state.formData.quizid = this.props.id;
        this.state.formData.level = "0";
        this.state.formData.player = localStorage.getItem("email");
        this.state.formData.score = this.state.points.toString();
        this.state.formData.quizname = this.state.data1[0].QuizName;
        console.log(this.state.formData.quizname);    
        fetch('http://localhost:8080/games', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if(response.status >= 200 && response.status < 300)
                this.setState({submitted: true});
                this.context.router.history.push("/Dashboard");
                });
    }
    // handleSkip=(event)=>{
    //     event.preventDefault();
    //     if(this.state.skip == 1){
    //         this.state.points = this.state.points+1;
    //         this.state.skip = this.state.skip - 1;
    //         this.setState({ptr: this.state.ptr+1});
    //     }
    // }
    // handleTwoX=(event)=>{
    //     event.preventDefault();
    //     if(this.state.TwoX == 1){
    //         if(this.state.A == this.state.data[this.state.ptr].A && this.state.B == this.state.data[this.state.ptr].B && this.state.C == this.state.data[this.state.ptr].C && this.state.D == this.state.data[this.state.ptr].D)
    //             this.state.points = this.state.points+2;
    //         else
    //             this.state.points = this.state.points-2;
    //         this.state.TwoX = this.state.TwoX - 1;
    //         this.setState({ptr: this.state.ptr+1});
    //     }
    // }
    render() {
        if(this.state.data.length == 0){
            return(
                <div>
                    <h1>
                        This Quiz has no questions!
                    </h1>
                    <button onClick={this.Retry}>Go To Main Page</button>
                </div>
            );
        }
        else if(this.state.ptr == this.state.data.length){
            return(
                <div>
                    <h1>Your Score is: {this.state.points} / {1*this.state.data.length}</h1>
                    <button onClick={this.Submit}>Submit</button>
                    <button onClick={this.Retry}>Retry</button>
                </div>
            );
        }
        else{
            return (
                <div className="App">
                    <header className="App-header">
                        <div>
                            <h1 className="App-title">Play Easy Quiz</h1>
                        </div>
                    </header>
                    {this.state.data.length > 0 &&
                        <div>
                            {this.state.data[this.state.ptr].Cat == "0" &&
                                <h3>{this.state.data[this.state.ptr].QuestionName}</h3>
                            }
                            {this.state.data[this.state.ptr].Cat == "1" &&
                                <div class="player">
                                    <ReactPlayer url={this.state.data[this.state.ptr].QuestionName} playing />
                                    <h3>Identify</h3>
                                </div>
                            }
                            {this.state.data[this.state.ptr].Cat == "2" &&
                                <div>
                                    <img src={this.state.data[this.state.ptr].QuestionName} alt="Image"/>
                                    <h3>Identify</h3>
                                </div>
                            }
                            {this.state.data[this.state.ptr].Type === "1"?<h5>(Multi)</h5>:<h5>(Single)</h5>}
                            <div>
                                <form >
                                    <table>
                                        <tr type="A">
                                            <td>A.<input type="checkbox" name = 'A' value="1" onClick = {this.AChange}/></td>
                                            <td>{this.state.data[this.state.ptr].OptionA}</td>
                                        </tr>
                                        <tr type="A">
                                            <td>B.<input type="checkbox" name = 'B' value="1" onClick = {this.BChange}/></td>
                                            <td>{this.state.data[this.state.ptr].OptionB}</td>
                                        </tr>
                                        <tr type="A">
                                            <td>C.<input type="checkbox" name = 'C' value="1" onClick = {this.CChange}/></td>
                                            <td>{this.state.data[this.state.ptr].OptionC}</td>
                                        </tr>
                                        <tr type="A">
                                            <td>D.<input type="checkbox" name = 'D' value="1" onClick = {this.DChange}/></td>
                                            <td>{this.state.data[this.state.ptr].OptionD}</td>
                                        </tr>
                                    </table>
                                    <br/>
                                    <button onClick={this.handleSubmit}>Submit</button>
                                    <br/><br/>
                                    {/* <h4><b>Power Ups</b></h4> */}
                                    {/* <button onClick={this.handleSkip}>Skip Question:{this.state.skip}</button> */}
                                    {/* <button onClick={this.handleTwoX}>2X:{this.state.TwoX}</button> */}
                                </form>
                            </div>
                        </div>
                    }
                </div>
            );
        }
    }
}

export default PlayEasyQuiz;
