import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {  collection, addDoc,serverTimestamp } from "firebase/firestore";
import { auth,db } from '../../firebase/config';
import { AuthContext, FirebaseContext } from '../../store/Context';

const Create = () => { 
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  // const storage = getStorage();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        const base64Image = await toBase64(image);

      await addDoc(collection(db, "products"), {
        userName,
        category,
        price,
        image:base64Image,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      alert("product added");
      setUserName("");
      setCategory("");
      setPrice("");
      setImage(null);
    }catch(error){
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
    
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
          <form>
            <br />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
