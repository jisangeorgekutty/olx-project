import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import Heart from '../../assets/Heart';
import { collection, getDocs } from "firebase/firestore";
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const {setPostDetails}=useContext(PostContext)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("ProductList" + productList);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards"
        >
          {products.map((product) => (
            <div key={product.id}
              className="card"
              onClick={()=>{
                setPostDetails(product);
                navigate("/view");
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
              {product.image && (
                <img src={product.image} alt={product.userName} />
              )}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; ${product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.userName}</p>
              </div>
              <div className="date">
                <span>{product.createdAt?.toDate().toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
