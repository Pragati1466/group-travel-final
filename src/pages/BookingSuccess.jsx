import { useLocation } from "react-router-dom";

const BookingSuccess = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="container" style={{ marginTop: "80px" }}>
        <h2>No booking data found</h2>
      </div>
    );
  }

  return (
    <div
      className="container fade-in"
      style={{ marginTop: "80px", textAlign: "center" }}
    >
      <h1>🎉 Booking Confirmed!</h1>

      <div className="glass-card" style={{ marginTop: "30px" }}>
        <h2>{data.hotel.name}</h2>
        <p>👥 Guests: {data.members}</p>
        <p>💰 Total Paid: ₹{data.amount}</p>
        <p style={{ marginTop: "16px" }}>
          Your trip is successfully booked. Have a great journey!
        </p>
      </div>
    </div>
  );
};

export default BookingSuccess;