export const initialUsers = [
  { id: 1, name: "Alice Martin", email: "alice.martin@email.com", country: "France" },
  { id: 2, name: "David Smith", email: "david.smith@email.com", country: "United Kingdom" },
  { id: 3, name: "Sara Johnson", email: "sara.johnson@email.com", country: "USA" },
  { id: 4, name: "Omar Khaled", email: "omar.khaled@email.com", country: "UAE" },
  { id: 5, name: "Lucas Romano", email: "lucas.romano@email.com", country: "Italy" },
]

export const initialHotels = [
  { id: 1, name: "Ritz Paris", city: "Paris", stars: 5, pricePerNight: 700 },
  { id: 2, name: "Savoy London", city: "London", stars: 5, pricePerNight: 650 },
  { id: 3, name: "Hilton Rome", city: "Rome", stars: 4, pricePerNight: 300 },
  { id: 4, name: "Mandarin Oriental Dubai", city: "Dubai", stars: 5, pricePerNight: 800 },
  { id: 5, name: "Grand Hotel Barcelona", city: "Barcelona", stars: 4, pricePerNight: 280 },
]

export const initialReservations = [
  { id: 1, userId: 1, hotelId: 1, checkIn: "2026-06-01", checkOut: "2026-06-05", totalPrice: 2800 },
  { id: 2, userId: 2, hotelId: 2, checkIn: "2026-07-10", checkOut: "2026-07-12", totalPrice: 1300 },
  { id: 3, userId: 3, hotelId: 4, checkIn: "2026-05-20", checkOut: "2026-05-23", totalPrice: 2400 },
  { id: 4, userId: 1, hotelId: 3, checkIn: "2026-08-01", checkOut: "2026-08-03", totalPrice: 600 },
]