import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { initialUsers, initialHotels, initialReservations } from './data/seedData'
import UsersPage from './pages/UsersPage'
import HotelsPage from './pages/HotelsPage'
import ReservationsPage from './pages/ReservationsPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [hotels, setHotels] = useState(initialHotels)
  const [reservations, setReservations] = useState(initialReservations)

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