import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import History from './History';
import Cart from './Cart';
import Nav from "./Nav"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [dogImage, setDogImage] = useState({ image: '', price: '' });

  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      const newDogImage = data.message;
      const price = getRandomPrice();
      setDogImage({ image: newDogImage, price });
      updateLocalStorage({ image: newDogImage, price });
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  const updateLocalStorage = (newDogData) => {
    const existingHistory = JSON.parse(localStorage.getItem('dogHistory')) || [];
    const updatedHistory = [...existingHistory, newDogData];
    localStorage.setItem('dogHistory', JSON.stringify(updatedHistory));
  };

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('dogCart')) || [];
    const updatedCart = [...existingCart, dogImage];
    localStorage.setItem('dogCart', JSON.stringify(updatedCart));
  };

  const getRandomPrice = () => {
    return (Math.random() * (50 - 1) + 1).toFixed(2);
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home dogImage={dogImage.image} fetchDogImage={fetchDogImage} addToCart={addToCart} />}
        />
        <Route path="/history" element={<History />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
