import HotelCard from "../components/HotelCard";

const Results = () => {
  const hotels = [
    {
      id: 1,
      name: "Grand Himalayan Resort",
      location: "Gangtok",
      price: "₹4,500 / night",
      rating: 4.6
    },
    {
      id: 2,
      name: "Mountain View Palace",
      location: "Gangtok",
      price: "₹6,200 / night",
      rating: 4.8
    }
  ];

  return (
    <div className="container fade-in" style={{ marginTop: "60px" }}>
      <h1 style={{ marginBottom: "24px" }}>Available Hotels</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px"
        }}
      >
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Results;