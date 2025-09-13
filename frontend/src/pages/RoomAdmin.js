import React, { useState, useEffect } from 'react';
import './Room.css';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter: all, available, booked, etc.
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Fetch rooms data from backend
    fetch('http://localhost:5000/api/rooms') // Ensure your backend endpoint is correct
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterRooms = () => {
    if (filter === 'all') return rooms;
    return rooms.filter((room) => room.status === filter);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room); // Show room details in a modal
  };

  return (
    <div className="room-page">
      <h1>Rooms Management</h1>

      <div className="room-filters">
        <label>Filter Rooms: </label>
        <select onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="vacant">Vacant</option>
        </select>
      </div>

      <div className="room-list">
        {filterRooms().map((room) => (
          <div
            key={room._id}
            className={`room-card ${room.status}`}
            onClick={() => handleRoomClick(room)}
          >
            <h2>Room {room.number}</h2>
            <p>Status: {room.status}</p>
            <p>Type: {room.type}</p>
          </div>
        ))}
      </div>

      {/* Modal for Selected Room Details */}
      {selectedRoom && (
        <div className="room-modal">
          <h2>Room {selectedRoom.number} Details</h2>
          <p>Type: {selectedRoom.type}</p>
          <p>Status: {selectedRoom.status}</p>
          <p>Facilities: {selectedRoom.facilities.join(', ')}</p>
          <button onClick={() => setSelectedRoom(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Room;
