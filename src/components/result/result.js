import React from 'react';
import { Route, withRouter } from "react-router-dom";

function calculatorComponent() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
          Learn React
      </header>
    </div>
  );
}

export default withRouter(calculatorComponent);
