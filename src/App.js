import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navtemp from './Navtemp';
import Home from './Home';
import About from './About';
import Services from './Services';
import Providers from './Providers';
import Contacts from './Contacts';
import Footer from './Footer1';

function App() {
  return (
    <Router>
      <div className='main-content'>
      <Navtemp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/providers' element={<Providers />}/>
        <Route path='/contacts' element={<Contacts />} />
        <Route />

       
      </Routes>
      <Footer />
      </div>
     
    </Router>
  );
}

export default App;
