import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import UserProfile from './UserProfile'


class Admin extends Component {
    constructor() {
        super();
        this.GoToDelete = this.GoToDelete.bind(this)
        this.GoToCreateQuiz = this.GoToCreateQuiz.bind(this)
    }
    static contextTypes = {
        router: PropTypes.object,
    }

    GoToDelete = (event) => {
        event.preventDefault();
        this.context.router.history.push("/DeletePerson");
    }

    GoToCreateQuiz = (event) => {
        event.preventDefault();
        this.context.router.history.push("/NewQuiz");
    }

    GoToDeleteQuiz = (event) => {
        event.preventDefault();
        this.context.router.history.push("/DeleteQuiz");
    }
    
    render(){
        
        if(localStorage.getItem("email") == 'admin@admin'){
            return(
                <div>
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">
                                Admin Desk
                            </h1>
                        </header>
                        <br/><br/>
                        <div className="formContainer">
                            <div className="form-group">
                                <button onClick = {this.GoToDelete}>Delete Users</button><br/><br/>
                                <button onClick = {this.GoToCreateQuiz}>Add Quiz/Questions</button><br/><br/>
                                <button onClick = {this.GoToDeleteQuiz}>Delete Quiz</button><br/><br/>
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
                    <h1>You are not Admin</h1>
                </div>
            );
        }
    }
}
export default Admin;