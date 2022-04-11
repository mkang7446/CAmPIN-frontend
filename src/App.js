import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Campgrounds from './components/Campgrounds/Campgrounds';
import Community from './components/Community/Community';
import Navigation from './components/Navigation/Navigation';
import CampingDetail from './CampingDetail/CampingDetail';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/:id' element={<CampingDetail />} />
        <Route path='/campgrounds' element={<Campgrounds />} />
        <Route path='/Community' element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
