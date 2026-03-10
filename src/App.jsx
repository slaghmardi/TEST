import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import HotelsPage from './pages/HotelsPage'
import ReservationsPage from './pages/ReservationsPage'
import Dashboard from './pages/Dashboard'

const API = 'http://localhost:5000/api'

function App() {
  const [users, setUsers] = useState([])
  const [hotels, setHotels] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch(`${API}/users`).then(r => r.json()).then(setUsers)
    fetch(`${API}/hotels`).then(r => r.json()).then(setHotels)
    fetch(`${API}/reservations`).then(r => r.json()).then(setReservations)
  }, [])

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <span className="navbar-brand">HotelApp</span>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Dashboard</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/hotels">Hotels</Link>
          <Link className="nav-link" to="/reservations">Reservations</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard users={users} hotels={hotels} reservations={reservations} />} />
          <Route path="/users" element={<UsersPage users={users} setUsers={setUsers} />} />
          <Route path="/hotels" element={<HotelsPage hotels={hotels} setHotels={setHotels} />} />
          <Route path="/reservations" element={<ReservationsPage users={users} hotels={hotels} reservations={reservations} setReservations={setReservations} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App