import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import TicketPurchase from './pages/TicketPurchase';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/tickets/:eventId" element={<TicketPurchase />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementByI
)