import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Mycampin from './components/Mycampin/Mycampin';
import Community from './components/Community/Community';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/mycampin' element={<Mycampin />} />
        <Route path='/Community' element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
