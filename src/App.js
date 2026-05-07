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

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header">
          <h1 className="text-warning">
            Brightstar School - Talent Expo
          </h1>
        </header>

        <Routes>

          <Route path="/" element={<Getproduct />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/addclothes" element={<AddClothes />} />
          <Route path="/addinstruments" element={<AddInstruments />} />
          <Route path="/buy-cloth" element={<BuyCloth />} />
          <Route path="/buy-instrument" element={<BuyInstrument />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="*" element={<Notfound />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;