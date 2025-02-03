import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { firebase } = useContext(FirebaseContext);



  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, useremail, userpassword).then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      navigate('/');
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
