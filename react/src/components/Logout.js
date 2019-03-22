import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

class Logout extends Component {
    constructor() {
        super();
    }
    static contextTypes = {
        router: PropTypes.object,
    }
    componentDidMount() {
        localStorage.clear();
        window.location.reload();
        this.context.router.history.push("/SignUp");
    }
    render(){
        return (<div></div>);
    }


}

export default Logout;