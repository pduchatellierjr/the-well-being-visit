import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VSL from './pages/VSL';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vsl" element={<VSL />} />
      </Routes>
    </Router>
  );
}

export default App;
