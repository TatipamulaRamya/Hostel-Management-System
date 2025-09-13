import React, { useState, useEffect } from 'react';
import './Adminpage.css';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [foodMenuData, setFoodMenuData] = useState([]);
  const [selection, setSelection] = useState('users'); // To keep track of the selection (users or food menu)

  useEffect(() => {
    const users = [
        { _id: "671b13a813acd64e6560c472", name: "shivani", email: "shiv@gmail.com", password: "$2b$10$HZ.KCd5vzXy.5xpQbpWLbOqlxjfCYGhj55lBNbPr79SXqMv.NOuqu", __v: 0 },
        { _id: "671e767ec46bf16b217a56a2", name: "ramya", email: "ramyatatipamula848@gmail.com", password: "$2b$10$E2fvK0HHTa3tN2gbMGdBt.eD67h/yYD551KH4GYyUjGSZ9zETLWbW", __v: 0, resetPasswordExpires: "2024-10-27T19:50:45.270+00:00", resetPasswordToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWU3NjdlYzQ2YmYxNmIyM…" },
        { _id: "6726350340d6388528f4f345", email: "vaish@gmail.com", password: "vaish", __v: 0 },
        { _id: "6729ec12208fa4b334d8f605", username: "bunny", email: "bunny@gmail.com", password: "$2b$10$.TPCS2rpVkHpyp4FdOQcNewALvuAz.vrXpJ4IMj7S4G5uyAvIMugK", __v: 0 },
        { _id: "672a250918b8422f8810050a", email: "danish14@gmail.com", password: "$2b$12$m0LgjrdZESCikxm5KMNeS.CwmKab4SIM8zRVsdOSI/XvjWmadRDd.", isAdmin: true },
        { _id: "672903c1a3243082f3011474", email: "shiva@gmail.com", password: "$2b$10$ko9y8/F7INYCK7eLF0QZEumeRdgpjuA7EmLSJf8QjlT.7.XYFri7.", isAdmin: true },
        { _id: "672b01d871367448adc564ed", username: "neha", email: "neha@gmail.com", password: "$2b$10$Y.bsIYLr/SIYHT7hHa6h..TIs9Fj4EPiC68y.duS44bF5YLmi9uyW", __v: 0 },
        { _id: "672b1d676396369a5c217253", username: "nav", email: "nav@gmail.com", password: "$2b$10$7pvLmko1.u7niOG/FUlSEuJjOU7hDKp95EhmmMnh3bcAJuMW3ks.W", __v: 0 },
        { _id: "672b263405773a8b538f23ab", name: "Admin User", email: "admin@example.com", password: "$2b$10$WWPYvSlsVi0K1GI1DDARdeu66Pl0vKHG8BeJxs04N04k2YtCTTOUC", isAdmin: true, createdAt: "2024-11-06T08:17:56.630+00:00" },
        { _id: "672b649ef05072da8e5ec62c", email: "shivanikune@gmail.com", password: "$2a$10$1.QDjNWcu4FMOzaWOwyAFe/MI33ncKRVN.A0/8oqC41RCSK5N6buW", isAdmin: false, date: "2024-11-06T12:44:14.104+00:00", __v: 0 },
        { _id: "672b669af05072da8e5ec631", email: "johndoe@example.com", password: "$2a$10$Gj8pkzVvDeFsgGH5PLc6aerUMNT5LZWmt7e.umHAaJoWnsDi1vAIC", isAdmin: false, date: "2024-11-06T12:52:42.389+00:00", __v: 0 }
      ];
    
      const foodMenu = [
        { _id: "672cb9975c89a017e2f710bc", userId: "672903c1a3243082f3011474", items: ["item1"], totalAmount: 150, orderDate: "2024-11-07T12:59:03.311+00:00" },
        { _id: "672cb9a35c89a017e2f710bf", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 200, orderDate: "2024-11-07T12:59:15.893+00:00" },
        { _id: "672cb9af5c89a017e2f710c3", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 130, orderDate: "2024-11-07T12:59:27.605+00:00" },
        { _id: "672cb9bc5c89a017e2f710c7", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 330, orderDate: "2024-11-07T12:59:40.108+00:00" },
        { _id: "672cb9e25c89a017e2f710cb", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 170, orderDate: "2024-11-07T13:00:18.277+00:00" },
        { _id: "672cba085c89a017e2f710cf", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3", "item4"], totalAmount: 800, orderDate: "2024-11-07T13:00:56.398+00:00" },
        { _id: "672cb4c15c89a017e2f71097", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3", "item4", "item5"], totalAmount: 50, orderDate: "2024-11-07T12:38:25.144+00:00" },
        { _id: "672cb5255c89a017e2f7109e", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 20, orderDate: "2024-11-07T12:40:05.728+00:00" },
        { _id: "672cb7c15c89a017e2f710a2", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3"], totalAmount: 410, orderDate: "2024-11-07T12:51:13.961+00:00" },
        { _id: "672cb9405c89a017e2f710a8", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3", "item4"], totalAmount: 590, orderDate: "2024-11-07T12:57:36.611+00:00" },
        { _id: "672cb95b5c89a017e2f710ae", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3"], totalAmount: 370, orderDate: "2024-11-07T12:58:03.289+00:00" },
        { _id: "672cb9775c89a017e2f710b3", userId: "672903c1a3243082f3011474", items: ["item1", "item2"], totalAmount: 370, orderDate: "2024-11-07T12:58:31.736+00:00" },
        { _id: "672cb98a5c89a017e2f710b7", userId: "672903c1a3243082f3011474", items: ["item1", "item2", "item3"], totalAmount: 470, orderDate: "2024-11-07T12:59:00.139+00:00" }
      ];
    setUserData(users);
    setFoodMenuData(foodMenu);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h1>Admin Page</h1>

      {/* Selection Option */}
      <div className="selection-container">
        <label htmlFor="dataSelection">Choose Table:</label>
        <select 
          id="dataSelection" 
          value={selection} 
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="users">User Details</option>
          <option value="foodMenu">Food Menu Details</option>
        </select>
      </div>

      {/* Display Selected Table */}
      {selection === 'users' ? (
        <div>
          <h2>User Details</h2>
          {userData.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Is Admin</th>
                  <th>Reset Password Expires</th>
                  <th>Reset Password Token</th>
                  <th>Created At</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id} className="user-row">
                    <td>{user._id}</td>
                    <td>{user.name || user.username || 'N/A'}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>{user.resetPasswordExpires || 'N/A'}</td>
                    <td>{user.resetPasswordToken || 'N/A'}</td>
                    <td>{user.createdAt || 'N/A'}</td>
                    <td>{user.date || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Food Menu Details</h2>
          {foodMenuData.length > 0 ? (
            <table className="food-menu-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Items Ordered</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {foodMenuData.map((order) => (
                  <tr key={order._id} className="food-menu-row">
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{order.items.join(', ')}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No food menu data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
