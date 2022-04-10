import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Mycampin from './screens/Mycampin';
import Post from './screens/Post';

function App() {
  return (
    // <div className='App'>
    <Router>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/mycampin' element={<Mycampin />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
