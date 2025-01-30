import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProductCreationPage from "./components/ProductCreationPage";
import ProductDetailPage from "./components/ProductDetailPage";
import HomePage from "./components/HomePage";
import './App.css'

const App = () => {
  const user = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        {
          user ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<Login />} />
          )
        }
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-product" element={<ProductCreationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
