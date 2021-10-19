import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import PressureListPage from './pages/PressureListPage';
import PressurePage from "./pages/PressurePage";


function App() {
  return (
    <Router>
    <div className="container dark">
      <div className="app">
       <Header />
       <Route path='/' exact component={PressureListPage} />
       <Route path='/pressure/:id' component={PressurePage} />
      </div>
    </div>
    </Router>
  );
}

export default App;
