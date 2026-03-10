import { useState } from 'react'

const API = 'http://localhost:5000/api'

function ReservationsPage({ users, hotels, reservations, setReservations }) {
  const [userId, setUserId] = useState('')
  const [hotelId, setHotelId] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const selectedHotel = hotels.find(h => h.id === Number(hotelId))
  const nights = checkIn && checkOut
    ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0
  const predictedPrice = selectedHotel ? nights * selectedHotel.pricePerNight : 0

  const addReservation = async () => {
    if (!userId || !hotelId || !checkIn || !checkOut) return alert('Please fill all fields')
    if (nights <= 0) return alert('Check-out must be after check-in')
    const res = await fetch(`${API}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: Number(userId), hotelId: Number(hotelId), checkIn, checkOut, totalPrice: predictedPrice })
    })
    const newReservation = await res.json()
    setReservations([...reservations, newReservation])
    setUserId(''); setHotelId(''); setCheckIn(''); setCheckOut('')
  }

  return (
    <div>
      <h2>Reservations</h2>
      <div className="card p-3 mb-4">
        <h5>New Reservation</h5>
        <div className="row g-2 mb-2">
          <div className="col">
            <select className="form-select" value={userId} onChange={e => setUserId(e.target.value)}>
              <option value="">Select user...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="col">
            <select className="form-select" value={hotelId} onChange={e => setHotelId(e.target.value)}>
              <option value="">Select hotel...</option>
              {hotels.map(h => <option key={h.id} value={h.id}>{h.name} (${h.pricePerNight}/night)</option>)}
            </select>
          </div>
        </div>
        <div className="row g-2 mb-2">
          <div className="col">
            <label>Check-in</label>
            <input type="date" className="form-control" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="col">
            <label>Check-out</label>
            <input type="date" className="form-control" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
        </div>
        {predictedPrice > 0 && (
          <div className="alert alert-info">Estimated total: <strong>${predictedPrice}</strong> ({nights} night{nights > 1 ? 's' : ''})</div>
        )}
        <button className="btn btn-primary" onClick={addReservation}>Book</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>User</th><th>Hotel</th><th>Check-in</th><th>Check-out</th><th>Total Price</th></tr>
        </thead>
        <tbody>
          {reservations.map(r => {
            const user = users.find(u => u.id === r.userId)
            const hotel = hotels.find(h => h.id === r.hotelId)
            return (
              <tr key={r.id}>
                <td>{user?.name || 'Unknown'}</td>
                <td>{hotel?.name || 'Unknown'}</td>
                <td>{r.checkIn}</td>
                <td>{r.checkOut}</td>
                <td>${r.totalPrice}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReservationsPage
