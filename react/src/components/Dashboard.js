import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Dashboard extends Component {
    constructor() {
        super();
    }
    
    static contextTypes = {
        router: PropTypes.object,
    }

    GoToViewQuiz = (event) => {
        event.preventDefault();
        this.context.router.history.push("/ViewQuiz");
    }
    GoToPlayerHistory = (event) => {
        event.preventDefault();
        this.context.router.history.push("/PlayerHistory");
    }
    GoToBonusQuestion = (event) => {
        event.preventDefault();
        this.context.router.history.push("/BonusQuestion");
    }

    render(){
        
        if(localStorage.getItem("email") != ''){
            return(
                <div>
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">{localStorage.getItem("email")} Dashboard</h1>
                        </header>
                        <br/><br/>
                        <div className="formContainer">
                            <div className="form-group">
                                <button onClick = {this.GoToViewQuiz}>View/Play Quiz</button><br/><br/>
                                <button onClick = {this.GoToPlayerHistory}>See History</button><br/><br/>
                                {/* <button onClick = {this.GoToBonusQuestion}>Bonus Question</button><br/><br/> */}
                            </div>
                        </div>
                    </div>
                </div>
                    
            );
        }
        else
        {
            return(
                <div>
                    <h1>You are not Logged in</h1>
                </div>
            );
        }
    }
}
export default Dashboard;