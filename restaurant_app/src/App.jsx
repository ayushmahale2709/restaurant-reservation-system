import { useState } from "react";
import "./App.css";

function App() {
  const totalSeats = 20;
  const [seatsLeft, setSeatsLeft] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", guestCount: "" });
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState('checkInTime');
  const [filter, setFilter] = useState('all');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guestCount = parseInt(form.guestCount, 10);

    if (guestCount > seatsLeft) {
      alert("Not enough seats available");
      return;
    }

    if (reservations.some(res => res.name === form.name && res.id !== editId)) {
      alert("Duplicate name not allowed");
      return;
    }

    if (editId) {
      setReservations(reservations.map(res => 
        res.id === editId 
          ? { ...res, name: form.name, phone: form.phone, guestCount, checkInTime: new Date().toLocaleTimeString() }
          : res
      ));
      setSeatsLeft(seatsLeft + reservations.find(res => res.id === editId).guestCount - guestCount);
    } else {
      const newReservation = {
        id: Date.now(),
        name: form.name,
        phone: form.phone,
        guestCount,
        checkInTime: new Date().toLocaleTimeString(),
        checkOutTime: null,
        status: 'pending',
      };
      setReservations([...reservations, newReservation]);
      setSeatsLeft(seatsLeft - guestCount);
    }

    setForm({ name: "", phone: "", guestCount: "" });
    setEditId(null);
  };

  const handleCheckout = (id) => {
    setReservations(reservations.map(res => {
      if (res.id === id && !res.checkOutTime) {
        setSeatsLeft(seatsLeft + res.guestCount);
        return { ...res, checkOutTime: new Date().toLocaleTimeString(), status: 'completed' };
      }
      return res;
    }));
  };

  const handleDelete = (id) => {
    const resToDelete = reservations.find(res => res.id === id);
    if (resToDelete && !resToDelete.checkOutTime) {
      setSeatsLeft(seatsLeft + resToDelete.guestCount);
    }
    setReservations(reservations.filter(res => res.id !== id));
  };

  const handleEdit = (id) => {
    const reservationToEdit = reservations.find(res => res.id === id);
    if (reservationToEdit) {
      setForm({
        name: reservationToEdit.name,
        phone: reservationToEdit.phone,
        guestCount: reservationToEdit.guestCount.toString(),
      });
      setEditId(id);
    }
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (sortBy === 'checkInTime') {
      return new Date(a.checkInTime) - new Date(b.checkInTime);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const filteredReservations = sortedReservations.filter(res => {
    if (filter === 'all') return true;
    return res.status === filter;
  });

  return (
    <div className="app-container">
      <h1 className="title">Restaurant Reservation System</h1>
      <div className="seats-container">
        <h2 className="seats-left">Seats Left: {seatsLeft}</h2>
      </div>

      <div className="options-container">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="checkInTime">Sort by Check-in Time</option>
          <option value="name">Sort by Name</option>
        </select>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">Show All</option>
          <option value="pending">Show Pending</option>
          <option value="completed">Show Completed</option>
        </select>
      </div>

      <div className="form-container">
        <form className="reservation-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="phone" 
            placeholder="Enter Phone Number" 
            value={form.phone} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            name="guestCount" 
            placeholder="Number of Guests" 
            value={form.guestCount} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="reserve-btn">
            {editId ? 'Update Reservation' : 'Reserve'}
          </button>
        </form>
      </div>

      <div className="table-container">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Guest Count</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(res => (
              <tr key={res.id}>
                <td>{res.name}</td>
                <td>{res.phone}</td>
                <td>{res.guestCount}</td>
                <td>{res.checkInTime}</td>
                <td>{res.checkOutTime || <button className="checkout-btn" onClick={() => handleCheckout(res.id)}>Checkout</button>}</td>
                <td>{res.status}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(res.id)}>Delete</button>
                  <button className="edit-btn" onClick={() => handleEdit(res.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
