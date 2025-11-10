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
import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";



function App() {
  const [admin, setAdmin] = useState(null);


  return (
    <Router>
      <ScrollToTop />
      <div className='App'>
      
        {!admin && (
          <>
      <Navtemp />
      <div className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/providers' element={<Providers />}/>
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/apply' element={<ProviderApplication />} />

        <Route path='admin' element={<AdminLogin onLogin={setAdmin}/> } />
        <Route />

       
      </Routes>
      </div>
      <Footer />
      
      </>
        )}
      {admin && (
        <Routes>
          <Route path='/admin/*' element={<AdminDashboard admin={admin} onLogout={() => setAdmin(null)} />} />
        </Routes>
      )}

      </div>
     
    </Router>
  );
}

export default App;
