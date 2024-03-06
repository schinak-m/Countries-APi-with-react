import React from 'react';
import Navbar from './components/Navbar'; // Import your shared Navbar component
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HashRouter } from "react-router-dom"

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Countries/>}></Route>
          <Route path="/:name" element={<CountryDetails/>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}
