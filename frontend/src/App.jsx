import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import University from './pages/University/University';
import Education from './pages/Education/Education';
import Science from './pages/Science/Science';
import Library from './pages/Library/Library';
import Chat from './pages/Chat/Chat';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/university" element={<University />} />
            <Route path="/education" element={<Education />} />
            <Route path="/science" element={<Science />} />
            <Route path="/library" element={<Library />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;