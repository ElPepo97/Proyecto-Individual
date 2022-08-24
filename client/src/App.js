import './App.css';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home.jsx';
import Initial from './components/Initial/Initial.jsx';
import CountryDetail from './components/CountryDetail/CountryDetail.jsx'
import Activity from './components/Activity/Activity';
import Play from './components/Play/play';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/countries/:id' component={ CountryDetail } />
        <Route path='/countries' component={ Home } />
        <Route path='/activity' component={ Activity } />
        <Route path='/play' component={ Play } />
        <Route path='/' component={ Initial }/>
      </Switch>
    </div>
  );
}

export default App;