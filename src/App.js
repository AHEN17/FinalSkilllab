import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';

function App() {
  const [products] = useState([
    { id: 1, name: 'YSL Perfume', price: 10, rating: 4, image: 'https://images-static.nykaa.com/media/catalog/product/3/5/355b63a3614272648425_4.jpg?tr=w-500' },
    { id: 2, name: 'Kayali Vanilla Perfume', price: 15, rating: 3, image: 'https://www.sephora.com/productimages/sku/s2224491-main-zoom.jpg?imwidth=2000' },
    { id: 3, name: 'Good Girl Supreme Perfume', price: 20, rating: 5, image: 'https://static.beautytocare.com/media/catalog/product/c/a/carolina-herrera-good-girl-eau-de-parfum-supreme-80ml_1.jpg' },
    { id: 4, name: 'Dior Sauvage', price: 25, rating: 4, image: 'https://www.flannels.com/images/imgzoom/77/77370396_xxl_a2.jpg' },
    { id: 5, name: 'Versace Eros Perfume', price: 30, rating: 5, image: 'https://perfumedubai.com/cdn/shop/articles/versace_bfdcf61d-bb8b-4bb5-9c2f-064a1ebd6d89_460x@2x.jpg?v=1652441078' },
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Luxury Perfumes</h1>
          <nav>
          <ul className="header-nav">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/about">About</Link></li>
  <li><Link to="/contact">Contact</Link></li>
  <li><button onClick={() => setShowCart(!showCart)}>Cart ({cart.length})</button></li>
</ul>

          </nav>
          {showCart && (
            <div className="cart-panel">
              <h2>Cart</h2>
              {cart.length === 0 ? (
                <p>Cart Empty</p>
              ) : (
                <div>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>${item.price} x {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <p>Total: ${calculateTotalAmount()}</p>
                  <button className="buy-now-button">Buy Now</button>
                </div>
              )}
            </div>
          )}
        </header>
        <Routes>
          <Route path="/" element={
            <div className="content">
              <nav className="navbar">
                <div className="searchbar">
                  <input type="text" placeholder="Search..." />
                </div>
                <div className="categories">
                  <select>
                    <option value="">All Categories</option>
                    <option value="category1">Perfume for Men</option>
                    <option value="category2">Perfume for women</option>
                    <option value="category3">ALL</option>
                  </select>
                </div>
              </nav>
              <div className="products">
                {products.map(product => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                      <p>Rating: {product.rating}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(product.id)}>-</button>
                      <input type="text" value={cart.find(item => item.id === product.id)?.quantity || 0} readOnly />
                      <button onClick={() => incrementQuantity(product.id)}>+</button>
                    </div>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="footer">
          Created by Meiha and Neha Shetty
        </footer>
      </div>
    </Router>
  );
  
}

export default App;
