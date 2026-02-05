import { useState } from "react";
import EventInventory from "./EventInventory";

const EventMicrosite = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      {/* Tab Navigation */}
      <div
        style={{
          position: "sticky",
          top: 60,
          background: "rgba(10, 10, 20, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 100,
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "10px 16px",
              background:
                activeTab === "overview"
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "rgba(255, 255, 255, 0.1)",
              border:
                activeTab === "overview"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          >
            📋 Event Overview
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            style={{
              padding: "10px 16px",
              background:
                activeTab === "inventory"
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "rgba(255, 255, 255, 0.1)",
              border:
                activeTab === "inventory"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          >
            📦 Manage Inventory
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" ? (
        <div className="container fade-in" style={{ marginTop: "60px" }}>
          <h1>💍 Sharma–Verma Wedding</h1>
          <p style={{ opacity: 0.8 }}>
            📍 Gangtok • 📅 20–22 December 2024
          </p>

          {/* Itinerary */}
          <div className="glass-card" style={{ marginTop: "24px" }}>
            <h3>📅 Event Itinerary</h3>
            <ul style={{ marginTop: "10px", lineHeight: "1.8" }}>
              <li>Day 1 – Arrival & Welcome Dinner</li>
              <li>Day 2 – Wedding Ceremony</li>
              <li>Day 3 – Breakfast & Checkout</li>
            </ul>
          </div>

          {/* Hotel */}
          <div className="glass-card" style={{ marginTop: "24px" }}>
            <h3>🏨 Hotel Assignment</h3>
            <p>Grand Himalayan Resort</p>
            <p>Room Type: Deluxe Double</p>
          </div>

          {/* Live Updates */}
          <div className="glass-card" style={{ marginTop: "24px" }}>
            <h3>⚡ Real-Time Updates</h3>
            <p>✔ Dinner time updated to 8:30 PM</p>
          </div>

          {/* AI Suggestions */}
          <div className="glass-card" style={{ marginTop: "24px" }}>
            <h3>🤖 AI Recommendations</h3>
            <ul>
              <li>✔ Assign nearby rooms for families</li>
              <li>✔ Suggest spa slots for relaxation-seeking guests</li>
              <li>✔ Schedule networking dinner for business guests</li>
            </ul>
          </div>
        </div>
      ) : (
        <EventInventory />
      )}
    </div>
  );
};

export default EventMicrosite;
