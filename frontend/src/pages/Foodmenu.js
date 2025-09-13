import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoodMenu.css';

const FoodMenu = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const [bookedItems, setBookedItems] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Monday');

    const weeklyMenu = {
        Monday: {
            morning: [{ name: 'Pancakes', price: 150 }, { name: 'Omelette', price: 120 }, { name: 'Fruit Salad', price: 90 }, { name: 'Yogurt Parfait', price: 100 }],
            afternoon: [{ name: 'Chicken Biryani', price: 300 }, { name: 'Paneer Butter Masala', price: 250 }, { name: 'Dal Makhani', price: 220 }, { name: 'Veg Pulao', price: 180 }],
            evening: [{ name: 'Pasta', price: 250 }, { name: 'Spring Rolls', price: 180 }, { name: 'Grilled Sandwich', price: 150 }, { name: 'Nachos', price: 200 }],
            night: [{ name: 'Grilled Fish', price: 400 }, { name: 'Steak', price: 500 }, { name: 'Paneer Tikka', price: 280 }, { name: 'Veg Thali', price: 300 }],
            snacks: [{ name: 'Cookies', price: 50 }, { name: 'Chips', price: 60 }, { name: 'Samosa', price: 70 }, { name: 'Fruit Bowl', price: 80 }],
        },
        Tuesday: {
            morning: [{ name: 'Smoothie', price: 120 }, { name: 'Toast', price: 70 }, { name: 'Breakfast Burrito', price: 150 }, { name: 'Cornflakes', price: 60 }],
            afternoon: [{ name: 'Pizza', price: 250 }, { name: 'Caesar Salad', price: 200 }, { name: 'Tomato Soup', price: 100 }, { name: 'Pasta Salad', price: 180 }],
            evening: [{ name: 'Steak', price: 450 }, { name: 'Fettuccine Alfredo', price: 300 }, { name: 'Mini Burgers', price: 200 }, { name: 'Veg Nachos', price: 150 }],
            night: [{ name: 'Sushi', price: 400 }, { name: 'Tempura', price: 350 }, { name: 'Chicken Curry', price: 300 }, { name: 'Veg Stir-Fry', price: 280 }],
            snacks: [{ name: 'Popcorn', price: 50 }, { name: 'Nuts', price: 80 }, { name: 'Muffin', price: 100 }, { name: 'Doughnut', price: 90 }],
        },
        Wednesday: {
            morning: [{ name: 'Bagel', price: 100 }, { name: 'Scrambled Eggs', price: 130 }, { name: 'Oatmeal', price: 90 }, { name: 'Smoothie Bowl', price: 150 }],
            afternoon: [{ name: 'Burger', price: 250 }, { name: 'Pasta', price: 220 }, { name: 'Mixed Veg Curry', price: 200 }, { name: 'Rice and Beans', price: 180 }],
            evening: [{ name: 'Chicken Wings', price: 300 }, { name: 'Pizza Slices', price: 250 }, { name: 'Pita & Hummus', price: 120 }, { name: 'Grilled Cheese', price: 140 }],
            night: [{ name: 'Lamb Curry', price: 450 }, { name: 'Stuffed Peppers', price: 300 }, { name: 'Vegetable Korma', price: 250 }, { name: 'Chana Masala', price: 200 }],
            snacks: [{ name: 'Fruit Yogurt', price: 60 }, { name: 'Pretzels', price: 70 }, { name: 'Energy Bars', price: 90 }, { name: 'Banana Bread', price: 100 }],
        },
        Thursday: {
            morning: [{ name: 'French Toast', price: 130 }, { name: 'Bacon & Eggs', price: 180 }, { name: 'Bagels', price: 100 }, { name: 'Granola', price: 120 }],
            afternoon: [{ name: 'Spaghetti', price: 250 }, { name: 'Chicken Shawarma', price: 280 }, { name: 'Grilled Vegetables', price: 180 }, { name: 'Tuna Salad', price: 200 }],
            evening: [{ name: 'Cheeseburger', price: 300 }, { name: 'Quesadilla', price: 200 }, { name: 'Chicken Kebab', price: 220 }, { name: 'Pasta Carbonara', price: 250 }],
            night: [{ name: 'Chicken Alfredo', price: 320 }, { name: 'BBQ Ribs', price: 450 }, { name: 'Vegetable Stir-Fry', price: 280 }, { name: 'Tofu Curry', price: 200 }],
            snacks: [{ name: 'Mini Pizza', price: 120 }, { name: 'Brownie', price: 80 }, { name: 'Fruit Salad', price: 90 }, { name: 'Trail Mix', price: 70 }],
        },
        Friday: {
            morning: [{ name: 'Bagel with Cream Cheese', price: 120 }, { name: 'Omelette', price: 150 }, { name: 'French Toast', price: 130 }, { name: 'Hash Browns', price: 90 }],
            afternoon: [{ name: 'Veggie Burger', price: 200 }, { name: 'Fish Curry', price: 320 }, { name: 'Veg Korma', price: 250 }, { name: 'Rice Bowl', price: 180 }],
            evening: [{ name: 'Loaded Fries', price: 150 }, { name: 'Garlic Bread', price: 100 }, { name: 'Paneer Tikka', price: 200 }, { name: 'Chicken Nuggets', price: 180 }],
            night: [{ name: 'Shrimp Curry', price: 380 }, { name: 'Lamb Roast', price: 450 }, { name: 'Veg Biryani', price: 300 }, { name: 'Mixed Veg', price: 200 }],
            snacks: [{ name: 'Cupcake', price: 60 }, { name: 'Chips & Salsa', price: 80 }, { name: 'Yogurt Parfait', price: 100 }, { name: 'Granola Bar', price: 70 }],
        },
        Saturday: {
            morning: [{ name: 'Avocado Toast', price: 150 }, { name: 'Pancakes', price: 130 }, { name: 'Bacon', price: 120 }, { name: 'Fruit Bowl', price: 90 }],
            afternoon: [{ name: 'Veggie Wrap', price: 200 }, { name: 'Chicken Caesar', price: 250 }, { name: 'Dal Fry', price: 180 }, { name: 'Couscous Salad', price: 220 }],
            evening: [{ name: 'Stuffed Chicken', price: 300 }, { name: 'Tacos', price: 200 }, { name: 'Bruschetta', price: 120 }, { name: 'Mozzarella Sticks', price: 150 }],
            night: [{ name: 'Butter Chicken', price: 320 }, { name: 'Mutton Curry', price: 450 }, { name: 'Paneer Biryani', price: 280 }, { name: 'Prawn Masala', price: 400 }],
            snacks: [{ name: 'Samosa', price: 80 }, { name: 'Breadsticks', price: 70 }, { name: 'Ice Cream', price: 100 }, { name: 'Fruit Tart', price: 90 }],
        },
        Sunday: {
            morning: [{ name: 'Waffles', price: 120 }, { name: 'Smoothie', price: 100 }, { name: 'Baked Beans', price: 90 }, { name: 'Bagels', price: 110 }],
            afternoon: [{ name: 'BBQ Chicken', price: 300 }, { name: 'Pasta Salad', price: 220 }, { name: 'Tomato Basil Soup', price: 180 }, { name: 'Veg Wrap', price: 200 }],
            evening: [{ name: 'Falafel', price: 200 }, { name: 'Chicken Quesadilla', price: 250 }, { name: 'Poutine', price: 150 }, { name: 'Mac & Cheese', price: 200 }],
            night: [{ name: 'Lamb Korma', price: 400 }, { name: 'Fish Tikka', price: 450 }, { name: 'Veg Chow Mein', price: 250 }, { name: 'Paneer Butter Masala', price: 300 }],
            snacks: [{ name: 'Pastry', price: 80 }, { name: 'Chocolate Mousse', price: 100 }, { name: 'Peanut Brittle', price: 60 }, { name: 'Donut', price: 90 }],
        },
    };
    

    const handleSelectItem = (day, meal, item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [`${day}-${meal}`]: prev[`${day}-${meal}`]
                ? [...prev[`${day}-${meal}`], item]
                : [item],
        }));
        setBookedItems((prev) => [...prev, item]);
        toast.success(`${item.name} added to your order!`);
    };

    const handleRemoveItem = (itemToRemove) => {
        setBookedItems((prev) => prev.filter(item => item.name !== itemToRemove.name));
        toast.info(`${itemToRemove.name} removed from your order.`);
    };

    const handleOrder = async () => {
        const orderDetails = {
            userId: '672903c1a3243082f3011474',
            items: bookedItems.map(item => ({ itemName: item.name, quantity: 1, price: item.price })),
            totalAmount: bookedItems.reduce((total, item) => total + item.price, 0),
        };

        try {
            const response = await fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails),
            });
            const data = await response.json();
            console.log('Order saved:', data);
            toast.success('Your food order has been placed!');
            setBookedItems([]);
        } catch (error) {
            console.error('Error saving order:', error);
            toast.error('Failed to place order.');
        }
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    return (
        <div className="food-menu-container">
            <h1>Weekly Food Menu</h1>
            <select value={selectedDay} onChange={handleDayChange}>
                {Object.keys(weeklyMenu).map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <div className="menu-grid">
                <div className="day-menu">
                    <h2>{selectedDay}</h2>
                    {Object.entries(weeklyMenu[selectedDay]).map(([meal, items]) => (
                        <div key={meal} className="meal-section">
                            <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                            <ul>
                                {items.map((item) => (
                                    <li key={item.name}>
                                        {item.name} - ₹{item.price}
                                        <button onClick={() => handleSelectItem(selectedDay, meal, item)}>Book</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="booked-items">
                <h2>Booked Items</h2>
                {bookedItems.length > 0 ? (
                    <ul>
                        {bookedItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ₹{item.price}
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items booked yet.</p>
                )}
            </div>

            <p>Total Amount: ₹{bookedItems.reduce((total, item) => total + item.price, 0)}</p>
            <button className="order-button" onClick={handleOrder} disabled={bookedItems.length === 0}>
                Place Order
            </button>
            <ToastContainer />
        </div>
    );
};

export default FoodMenu;
