// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import MyAccount from './components/MyAccount';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Header from './components/Header';

function App() {
  const [cartTotal] = useState(0); // Replace 0 with dynamic cart total if needed

  return (
    <Router>
      <Header cartTotal={cartTotal} /> {/* Include Header component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
