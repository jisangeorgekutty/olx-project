import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './View.css';
import { PostContext } from '../../store/PostContext';


function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  useEffect(() => {
    if (postDetails?.userId) {
      const fetchUserDetails = async () => {
        const userRef = doc(db, "users", postDetails.userId);
        const userSnap = await getDoc(userRef);
        console.log(userSnap.data());
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        } else {
          console.log("No such user found!");
        }
      };

      fetchUserDetails();
    }
  }, [postDetails]);
  return (
    <div className="viewParentDiv">
      {postDetails && (
        <>
          <div className="imageShowDiv">
            {postDetails.image && (
              <img src={postDetails?.image} alt="" />
            )}
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.userName}</span>
              <p>{postDetails.category}</p>
              <span>{postDetails.createdAt?.toDate().toDateString()}</span>
            </div>
            {userDetails && (<div className="contactDetails">
              <p>Seller Details</p>
              <p>{userDetails.username}</p>
              <p>{userDetails.usernumber}</p>
            </div>
            )}
          </div>
          </>
      )}
    </div>
  );
}
export default View;
