import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** COMPONENTS */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/** PAGES */
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
