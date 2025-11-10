import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navtemp from './Navtemp';
import Home from './Homee';
import About from './About';
import Services from './Services';
import Providers from './Providers';
import Contacts from './Contacts';
import Footer from './Footer1';
import ScrollToTop from "./ScrollToTop";
import ProviderApplication from './ProviderApplication';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='main-content'>
      <Navtemp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/providers' element={<Providers />}/>
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/apply' element={<ProviderApplication />} />
        <Route />

       
      </Routes>
      <Footer />
      </div>
     
    </Router>
  );
}

export default App;
