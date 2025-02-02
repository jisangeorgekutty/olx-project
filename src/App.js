import React from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './Pages/Signup';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}>
          </Route>
          <Route path='/signup' element={<SignupPage />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
