import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { auth, db } from '../../firebase/config';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usernumber, setUsernumber] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firebase);
    createUserWithEmailAndPassword(auth, useremail, userpassword)
      .then((result) => {
        return updateProfile(result.user, { displayName: username }).then(() => {
          return result;
        });
      }).then((result) => {
        const userDocRef = doc(collection(db, "users"), result.user.uid);
        return setDoc(userDocRef, {
          uid: result.user.uid,
          username: username,
          usernumber: usernumber,
        });
      }).then(() => {
        navigate("/login");
      })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={usernumber}
            onChange={(e) => setUsernumber(e.target.value)}
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
