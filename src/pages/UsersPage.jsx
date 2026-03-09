import { useState } from 'react'

function UsersPage({ users, setUsers }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')

  const addUser = () => {
    if (!name || !email || !country) return alert('Please fill all fields')
    setUsers([...users, { id: Date.now(), name, email, country }])
    setName(''); setEmail(''); setCountry('')
  }

  const removeUser = (id) => setUsers(users.filter(u => u.id !== id))

  return (
    <div>
      <h2>Users</h2>
      <div className="card p-3 mb-4">
        <h5>Add New User</h5>
        <div className="row g-2">
          <div className="col"><input className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="col"><input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="col"><input className="form-control" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} /></div>
          <div className="col-auto"><button className="btn btn-primary" onClick={addUser}>Add</button></div>
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>Name</th><th>Email</th><th>Country</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.country}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeUser(u.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage