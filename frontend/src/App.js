import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Room from './pages/Room';
import RoomAdmin from './pages/RoomAdmin';
import About from './pages/About';
import Facilities from './pages/Facilities';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import FoodMenu from './pages/Foodmenu'; 
import DiscussionRoom from './pages/DiscussionRoom'; // Import Discussion Room

import Contact from './pages/Contact';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminPage from './pages/Adminpage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/room' element={<PrivateRoute element={<Room />} />} />
        <Route path='/facilities' element={<PrivateRoute element={<Facilities />} />} />
        <Route path='/foodmenu' element={<PrivateRoute element={<FoodMenu />} />} />
        <Route path='/discussion-room' element={<PrivateRoute element={<DiscussionRoom />} />} /> 
        <Route path='/contact' element={<PrivateRoute element={<Contact />} />} />
        
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/roomadmin' element={<PrivateRoute element={<RoomAdmin />} />} />
      </Routes>
    </div>
  );
}
export default App;
