import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

const hotels = [
  {
    id: 1,
    name: "Grand Himalayan Resort",
    location: "Nepal",
    price: "₹4,500 / night",
    rating: 4.6
  },
  {
    id: 2,
    name: "Everest View Hotel",
    location: "Nepal",
    price: "₹6,200 / night",
    rating: 4.8
  },
  {
    id: 3,
    name: "Kathmandu Palace",
    location: "Nepal",
    price: "₹3,800 / night",
    rating: 4.4
  }
];

const Results = () => {
  return (
    <>
      <Navbar />
      <div className="container fade-in" style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>
          Available Group Hotels
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Results;