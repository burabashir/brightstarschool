import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';
import Mycarousel from './components/Mycarousel';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="text-warning">Brightstar School - Talent Expo</h1>
        </header>
        <nav>
          <nav>
          {/* <Link to="/"  className='btn btn-primary btn-sm m-1'> Home</Link> */}
          {/* <Link to="/addproduct" className='btn btn-success btn-sm m-1' >Add product</Link> */}
          {/* <Link to="/signin" className='btn btn-danger btn-sm m-1' >Signin</Link> */}
          {/* <Link to="/signup" className='btn btn-info btn-sm m-1' >Signup</Link> */}
        </nav>
        </nav>

        {/* below is the routes for the different components */}
        <Routes>
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/" element={<Getproduct />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='*' element={<Notfound />} />
          <Route path='/makepayment' element={<Makepayment />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
