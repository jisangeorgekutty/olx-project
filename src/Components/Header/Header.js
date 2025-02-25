import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth} from '../../firebase/config'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [userd,setUserd]=useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      setUserd(currentUser);
    })
  })

  const handleLogout=()=>{
    signOut(auth)
      .then(() => {
        setUserd(null);signOut(auth)
        .then(() => {
          setUserd(null); 
          console.log("User signed out successfully");
        }).then(()=>{
          navigate('/login')
        })
      })
  }
  // const user = useContext(AuthContext);
  // console.log("Name" + user?.displayName)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>{navigate("/")}} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{userd ? `${userd?.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {userd ? <span onClick={handleLogout}>Logout</span> : ""}

        <div onClick={()=>{navigate("/create")}} className="sellMenu">
          <SellButton ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
