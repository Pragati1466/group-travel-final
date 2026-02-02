import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card fade-in">
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr auto",
        gap: "18px",
        alignItems: "center"
      }}>
        <input placeholder="Destination city" />
        <input type="date" />
        <input type="date" />
        <button
          className="btn-primary"
          onClick={() => navigate("/results")}
        >
          Search Hotels
        </button>
      </div>
    </div>
  );
};

export default SearchForm;