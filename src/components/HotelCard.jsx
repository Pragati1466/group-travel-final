const HotelCard = ({ hotel }) => {
  return (
    <div className="glass-card" style={{ cursor: "pointer" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
        {hotel.name}
      </h3>

      <p style={{ color: "#c7d2fe", marginBottom: "12px" }}>
        📍 {hotel.location}
      </p>

      <p style={{ fontWeight: "600", marginBottom: "10px" }}>
        {hotel.price}
      </p>

      <p style={{ marginBottom: "16px" }}>
        ⭐ {hotel.rating}
      </p>

      <button className="btn-primary" style={{ width: "100%" }}>
        View Details
      </button>
    </div>
  );
};

export default HotelCard;