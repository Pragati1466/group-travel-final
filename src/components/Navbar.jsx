import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999, // make sure it's above orbs
        background: "rgba(2, 6, 23, 0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <h2
          style={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #38bdf8, #2563eb)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          GroupTravel
        </h2>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => navigate("/reports")}
            style={{
              color: "white",
              border: "1px solid white",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            View Reports
          </button>
          <button
            onClick={() => navigate("/secure")}
            style={{
              color: "white",
              border: "1px solid white",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
           Secure Access
          </button>
          
          <button
            className="btn-primary"
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              background: "linear-gradient(90deg,#38bdf8,#2563eb)",
              color: "white",
            }}
          >
            Create Group
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
