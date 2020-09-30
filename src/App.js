import React from 'react';
import './App.css';
import { Route, Switch ,BrowserRouter as Router} from "react-router-dom";
import FormsPage from './components/calculatorComponent/calculator';
// import FormsPage from './components/FormsPage/FormsPage.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={FormsPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
