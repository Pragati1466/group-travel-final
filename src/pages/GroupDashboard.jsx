import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const GroupDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state;

  const [members, setMembers] = useState([
    { name: "Aman", status: "Confirmed" },
    { name: "Riya", status: "Pending" }
  ]);

  const [newMember, setNewMember] = useState("");

  if (!hotel) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h2>No hotel selected</h2>
        <p>Please go back and select a hotel.</p>
      </div>
    );
  }

  const nights = 2;
  const totalCost = 4500 * nights;
  const perPerson = Math.round(totalCost / members.length);

  const addMember = () => {
    if (!newMember) return;
    setMembers([...members, { name: newMember, status: "Pending" }]);
    setNewMember("");
  };

  const confirmMember = (index) => {
    const updated = [...members];
    updated[index].status = "Confirmed";
    setMembers(updated);
  };

  return (
    <div className="container fade-in" style={{ marginTop: "60px" }}>
      <h1>Group Booking Dashboard</h1>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h2>{hotel.name}</h2>
        <p>📍 {hotel.location}</p>
        <p>💰 ₹{totalCost} total ({nights} nights)</p>
        <p>👤 ₹{perPerson} per person</p>
      </div>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h2>Add Group Member</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          style={{ marginRight: "12px", marginTop: "10px" }}
        />

        <button className="btn-primary" onClick={addMember}>
          Add
        </button>
      </div>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h2>Group Members</h2>

        {members.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px"
            }}
          >
            <span>
              {m.name} – {m.status}
            </span>

            {m.status === "Pending" && (
              <button
                className="btn-primary"
                style={{ padding: "6px 12px" }}
                onClick={() => confirmMember(i)}
              >
                Confirm
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: "24px" }}
        onClick={() =>
          navigate("/booking-success", {
            state: {
              hotel,
              members: members.length,
              amount: totalCost
            }
          })
        }
      >
        Confirm Booking
      </button>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h2>Booking Status</h2>

        <p style={{ marginBottom: "16px" }}>
          {members.every((m) => m.status === "Confirmed")
            ? "✅ All members confirmed. Ready to book!"
            : "🟡 Waiting for all members to confirm"}
        </p>

        {members.every((m) => m.status === "Confirmed") && (
          <button
            className="btn-primary"
            onClick={() =>
              navigate("/booking-success", {
                state: {
                  hotel,
                  members: members.length,
                  amount: totalCost
                }
              })
            }
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupDashboard;
