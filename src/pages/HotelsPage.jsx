import { useState } from 'react'

const API = 'http://localhost:5000/api'

function HotelsPage({ hotels, setHotels }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [stars, setStars] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [preference, setPreference] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const addHotel = async () => {
    if (!name || !city || !stars || !price) return alert('Please fill all fields')
    const res = await fetch(`${API}/hotels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, city, stars: Number(stars), pricePerNight: Number(price) })
    })
    const newHotel = await res.json()
    setHotels([...hotels, newHotel])
    setName(''); setCity(''); setStars(''); setPrice('')
  }

  const removeHotel = async (id) => {
    await fetch(`${API}/hotels/${id}`, { method: 'DELETE' })
    setHotels(hotels.filter(h => h.id !== id))
  }

  let filtered = hotels.filter(h => {
    if (search.toLowerCase() === 'cheap') return true
    if (search.toLowerCase() === 'luxury') return true
    return h.city.toLowerCase().includes(search.toLowerCase())
  })

  if (search.toLowerCase() === 'cheap') {
    filtered = [...filtered].sort((a, b) => a.pricePerNight - b.pricePerNight)
  } else if (search.toLowerCase() === 'luxury') {
    filtered = [...filtered].sort((a, b) => b.stars - a.stars)
  }

  const recommended = preference === 'budget'
    ? [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight)[0]
    : preference === 'luxury'
    ? [...hotels].sort((a, b) => b.stars - a.stars)[0]
    : null

  const cities = [...new Set(hotels.map(h => h.city))]
  const suggestedHotel = selectedCity
    ? [...hotels].filter(h => h.city === selectedCity).sort((a, b) => b.stars - a.stars)[0]
    : null

  return (
    <div>
      <h2>Hotels</h2>
      <div className="card p-3 mb-4">
        <h5>Add New Hotel</h5>
        <div className="row g-2">
          <div className="col"><input className="form-control" placeholder="Hotel Name" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="col"><input className="form-control" placeholder="City" value={city} onChange={e => setCity(e.target.value)} /></div>
          <div className="col"><input className="form-control" placeholder="Stars (1-5)" type="number" value={stars} onChange={e => setStars(e.target.value)} /></div>
          <div className="col"><input className="form-control" placeholder="Price/Night ($)" type="number" value={price} onChange={e => setPrice(e.target.value)} /></div>
          <div className="col-auto"><button className="btn btn-success" onClick={addHotel}>Add</button></div>
        </div>
      </div>

      <div className="card p-3 mb-4">
        <h5>Hotel Recommendation</h5>
        <div className="d-flex gap-2">
          <button className={`btn ${preference === 'budget' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setPreference('budget')}>Budget</button>
          <button className={`btn ${preference === 'luxury' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setPreference('luxury')}>Luxury</button>
        </div>
        {recommended && <div className="alert alert-info mt-2">Recommended: <strong>{recommended.name}</strong> — {recommended.city} | {recommended.stars}⭐ | ${recommended.pricePerNight}/night</div>}
      </div>

      <div className="card p-3 mb-4">
        <h5>Top Hotel by City</h5>
        <select className="form-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
          <option value="">Select a city...</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {suggestedHotel && <div className="alert alert-success mt-2">Top pick: <strong>{suggestedHotel.name}</strong> — {suggestedHotel.stars}⭐ | ${suggestedHotel.pricePerNight}/night</div>}
      </div>

      <input className="form-control mb-3" placeholder='Search by city, or type "cheap" / "luxury"' value={search} onChange={e => setSearch(e.target.value)} />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>Name</th><th>City</th><th>Stars</th><th>Price/Night</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(h => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td>{h.city}</td>
              <td>{'⭐'.repeat(h.stars)}</td>
              <td>${h.pricePerNight}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeHotel(h.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HotelsPage