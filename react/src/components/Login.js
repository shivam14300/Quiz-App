import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                email: "",
                password: "",
            },
            submitted: false,
        }
        this.handleEChange = this.handleEChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    responseGoogle = (response) => {
        localStorage.setItem("email",response.w3.U3);
        window.location.reload();
        this.context.router.history.push("/Dashboard");
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setState({submitted: true});
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                localStorage.setItem("email",this.state.formData.email)
                window.location.reload();
                if(localStorage.getItem("email") == 'admin@admin')
                    this.context.router.history.push("/Admin");
                else
                this.context.router.history.push("/Dashboard");
            }
        });
    }
    handleEChange(event) {
        this.state.formData.email = event.target.value;
    }
    handlePChange(event) {
        this.state.formData.password = event.target.value;
    }
    
    render(){
        if(localStorage.getItem("email") == null){
            return (
                <div>
                    <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Login</h1>
                    </header>
                    <br/><br/>
                    <div className="formContainer">
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
                        </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                            <br/><br/>
                            <GoogleLogin
                                clientId="773980643015-la9td5tbsi04t23flhebfbrvel5srfkh.apps.googleusercontent.com"
                                buttonImage="./btn_google_signin_light_pressed_web.png"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </form>
                    </div>
                    {this.state.submitted &&
                        <div>
                        <h2>Unsuccessful Login.</h2>
                        </div>
                    }
                    </div>
                    
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1>
                        {localStorage.getItem("email")} is already Logged in.
                    </h1>
                </div>
            );
        }
        
    }


}

export default Login;