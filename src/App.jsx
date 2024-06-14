import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Pages/Home';
import Product from './Pages/Product';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';
import Cart from './Pages/Cart';
import Navbar from './components/Navigation/Navbar';

// Notify Added
import {Toaster, toast} from 'sonner'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Toaster/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<Navigate to='/notfound' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
