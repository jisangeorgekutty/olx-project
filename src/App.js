import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { AuthContext } from './store/Context';
// import { FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth} from './firebase/config';
import Create from './Pages/Create';

function App() {
  const {user,setUser}=useContext(AuthContext);

  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      console.log(currentUser?.displayName)
    })
  })

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}>
          </Route>
          <Route path='/signup' element={<SignupPage />}>
          </Route>
          <Route path='/login' element={<LoginPage />}>
          </Route>
          <Route path='/create' element={<Create />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
