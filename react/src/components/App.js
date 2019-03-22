import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Admin from './Admin';
import Dashboard from './Dashboard';
import NewPerson from './NewPerson';
import ViewPeople from './ViewPeople';
import DeletePerson from './DeletePerson';
import NewQuiz from './CreateQuiz';
import ViewQuiz from './ViewQuiz';
import QuizPage from './QuizPage';
import EasyQuiz from './EasyQuiz';
import PlayEasyQuiz from './PlayEasyQuiz';
import HardQuiz from './HardQuiz';
import PlayHardQuiz from './PlayHardQuiz';
import DeleteQuiz from './DeleteQuiz';
import NewQuestion from './CreateQuestion';
import UpdateQuestion from './UpdateQuestion';
import DeleteQuestion from './DeleteQuestion';
import EditPerson from './EditPerson';
import PlayerHistory from './PlayerHistory';
import Leaderboard from './Leaderboard';
import CompleteLeaderboard from './CompleteLeaderboard';
import QuizLeaderboard from './QuizLeaderboard';
import LevelLeaderboard from './LevelLeaderboard';
import QuizEasyLeaderboard from './QuizLevelLeaderboard';
import QuizHardLeaderboard from './QuizLevelLeaderboard';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
          {localStorage.getItem("email") == null && 
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/SignUp'}>Sign Up</Link></li>
                    <li><Link to={'/Login'}>Login</Link></li>
                  </ul>
              </div>
            </nav>
          }
          {localStorage.getItem("email") != "" && localStorage.getItem("email") != null && localStorage.getItem("email") != "admin@admin" && 
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/Dashboard'}>Dashboard</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
          }
          {localStorage.getItem("email") == "admin@admin" && 
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/Dashboard'}>Dashboard</Link></li>
                  <li><Link to={'/Admin'}>Admin Desk</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
          }
          <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/SignUp' component={NewPerson} />
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/DeleteQuestion/:id' render = {({match}) => <DeleteQuestion id = {match.params.id} />}/>
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/PlayerHistory' component={PlayerHistory} />
                 <Route exact path='/EasyQuiz/:id' render = {({match}) => <EasyQuiz id = {match.params.id} />} />
                 <Route exact path='/HardQuiz/:id' render = {({match}) => <HardQuiz id = {match.params.id} />} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/Admin' component={Admin} />
                 <Route exact path='/Dashboard' component={Dashboard} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/CompleteLeaderboard' component={CompleteLeaderboard} />
                 <Route exact path='/NewQuiz' component={NewQuiz} />
                 <Route exact path='/NewQuestion/:id' render = {({match}) => <NewQuestion id = {match.params.id} />}/> 
                 <Route exact path='/UpdateQuestion/:Quizid/:id' render = {({match}) => <UpdateQuestion  Quizid = {match.params.Quizid} id = {match.params.id} />}/> 
                 <Route exact path='/QuizPage/:id' render = {({match}) => <QuizPage id = {match.params.id} />}/> 
                 <Route exact path='/PlayEasyQuiz/:id' render = {({match}) => <PlayEasyQuiz id = {match.params.id} />}/> 
                 <Route exact path='/PlayHardQuiz/:id' render = {({match}) => <PlayHardQuiz id = {match.params.id} />}/> 
                 <Route exact path='/QuizLeaderboard/:id' render = {({match}) => <QuizLeaderboard id = {match.params.id} />}/> 
                 <Route exact path='/QuizEasyLeaderboard/:id' render = {({match}) => <QuizEasyLeaderboard id = {match.params.id} />}/> 
                 <Route exact path='/QuizHardLeaderboard/:id' render = {({match}) => <QuizHardLeaderboard id = {match.params.id} />}/> 
                 <Route exact path='/LevelLeaderboard/:lvl' render = {({match}) => <LevelLeaderboard lvl = {match.params.lvl} />}/> 
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
