import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import PressureListPage from './pages/PressureListPage';
import PressurePage from "./pages/PressurePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <Router>
    <AuthProvider>
    <div className="container dark">
      <div className="app">
      
       <Header />
          <PrivateRoute path='/' exact component={PressureListPage} />
          <Route path='/login' component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path='/pressure/:id' component={PressurePage} />
      </div>
    </div>
    </AuthProvider>
    </Router>
  );
}

export default App;
