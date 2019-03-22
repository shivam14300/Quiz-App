import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';

	import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

	class Leaderboard extends Component {
	constructor() {
		super();
		this.state = {
		data: [],
		opt: "",
		lvl: "",
		}
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
	Complete=(event)=>{
		this.context.router.history.push("/CompleteLeaderboard");
	}
	handleGoGenre=(event)=>{
		this.context.router.history.push("/QuizLeaderboard/"+this.state.opt);
	}
	handleGoLevel=(event)=>{
		this.context.router.history.push("/LevelLeaderboard/"+this.state.lvl);
	}
	handleChange=(event)=>{
		this.setState({opt: event.target.value});
	}
	handleLChange=(event)=>{
		this.setState({lvl: event.target.value});
	}
	render() {
			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Leaderboards</h1>
					</header>
						<br/><br/><br/><br/>
						<button onClick={this.Complete}>Complete Leaderboard</button><br/><br/><br/>
						<h3>Leaderboard By Genre</h3>
						<form onSubmit = {this.handleGoGenre}>
							<select>
								<option name = 'gt' value="0">Select A Quiz</option>
								{this.state.data.map((item,key)=>{  
									return (
										<option name = 'gt' value={item.id} onClick = {this.handleChange}>{item.QuizName}</option>
									)
								})}
							</select>
							<br></br>
							<button>View</button>
						</form>
						<br/><br/><br/><br/>
						<h3>Leaderboard By Level</h3>
						<form onSubmit = {this.handleGoLevel}>
							<select>
								<option name = 'bt' value="2">Select A Level</option>
								<option name = 'bt' value="0" onClick = {this.handleLChange}>Easy</option>
								<option name = 'bt' value="1" onClick = {this.handleLChange}>Hard</option>
							</select>
							<br></br>
							<button>View</button>
						</form>

						{/* <br/><br/><br/><br/>
						<h3>Leaderboard By Quiz And Level</h3>
						<form onSubmit>
							<select>
								<option name = 'gt' value="0">Select A Quiz</option>
								{this.state.data.map((item,key)=>{  
									return (
										<option name = 'gt' value={item.id} onClick = {this.handleChange}>{item.QuizName}</option>
									)
								})}
							</select>
						</form>
						<form>
							<select>
								<option name = 'bt' value="2">Select A Level</option>
								<option name = 'bt' value="0" onClick = {this.handleLChange}>Easy</option>
								<option name = 'bt' value="1" onClick = {this.handleLChange}>Hard</option>
							</select>
							<br></br>
							{this.state.lvl == "0"?<Link to={'/QuizEasyLeaderboard/'+this.state.opt}>View</Link>:<Link to={'/QuizHardLeaderboard/'+this.state.opt}>View</Link>}
						</form> */}
				</div>
			);
	}
}

export default Leaderboard;
