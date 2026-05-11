import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Clothes from './components/Clothes';
import Instruments from './components/Instruments';
import AddClothes from './components/AddClothes';
import AddInstruments from './components/AddInstruments';
import BuyCloth from './components/BuyCloth';
import BuyInstrument from './components/BuyInstrument';
import MakePaymentClothes from './components/Makepaymentclothes';
import MakePaymentInstruments from './components/Makepaymentinstruments';
import Contact from './components/Contact';
import Apply from './components/Apply';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import ProtectedRoute from './components/ProtectedRoute';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* Navbar visible on all pages */}
        <Navbar />

        <Routes>

          {/* PUBLIC ROUTES - anyone can access */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Getproduct />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />

          {/* PAYMENT SUCCESS - shown after STK Push is sent */}
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* PROTECTED ROUTES - must be signed in */}
          <Route path="/makepayment" element={
            <ProtectedRoute>
              <Makepayment />
            </ProtectedRoute>
          } />
          <Route path="/pay-clothes" element={
            <ProtectedRoute>
              <MakePaymentClothes />
            </ProtectedRoute>
          } />
          <Route path="/pay-instruments" element={
            <ProtectedRoute>
              <MakePaymentInstruments />
            </ProtectedRoute>
          } />
          <Route path="/buy-cloth" element={
            <ProtectedRoute>
              <BuyCloth />
            </ProtectedRoute>
          } />
          <Route path="/buy-instrument" element={
            <ProtectedRoute>
              <BuyInstrument />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          {/* SCHOOL ONLY ROUTES - must be signed in */}
          <Route path="/addproduct" element={
            <ProtectedRoute>
              <Addproduct />
            </ProtectedRoute>
          } />
          <Route path="/addclothes" element={
            <ProtectedRoute>
              <AddClothes />
            </ProtectedRoute>
          } />
          <Route path="/addinstruments" element={
            <ProtectedRoute>
              <AddInstruments />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Notfound />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;