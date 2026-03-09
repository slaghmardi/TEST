function Dashboard({ users, hotels, reservations }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card text-white bg-primary p-3 text-center">
            <h5>Total Users</h5>
            <h2>{users.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 text-center">
            <h5>Total Hotels</h5>
            <h2>{hotels.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning p-3 text-center">
            <h5>Total Reservations</h5>
            <h2>{reservations.length}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard