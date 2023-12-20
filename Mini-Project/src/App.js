import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation'
import {Router,Route,Routes,Link} from 'react-router-dom';
import Home from './Home'
import Body from './Body'
import About from './About';
import Contact from './Contact';
function App() {
  return (
    <div id="app">
      <Navigation></Navigation>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
