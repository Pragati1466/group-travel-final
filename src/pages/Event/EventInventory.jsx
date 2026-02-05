import { useState, useEffect } from "react";
import EventInventoryService from "./EventInventoryService";
import ResourceAllocationEngine from "./ResourceAllocationEngine";
import InventoryCard from "./InventoryCard";
import "./EventInventory.css";

const EventInventory = ({ eventId = "wedding-2024" }) => {
  const [inventory, setInventory] = useState(null);
  const [activeTab, setActiveTab] = useState("rooms");
  const [summary, setSummary] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState("room");
  const [formData, setFormData] = useState({});

  // Initialize inventory on first load
  useEffect(() => {
    loadInventory();
  }, [eventId]);

  const loadInventory = () => {
    let inv = EventInventoryService.getEventInventory(eventId);

    // Initialize if doesn't exist
    if (!inv) {
      inv = EventInventoryService.initializeEventInventory({
        eventId,
        eventName: "Group Travel Event",
        eventDate: new Date().toISOString(),
        rooms: [
          {
            id: 1,
            type: "Standard Room",
            quantity: 10,
            accessible: false,
            quiet: false,
            highFloor: false,
            groundFloor: true,
            booked: 3,
            available: 7
          },
          {
            id: 2,
            type: "Deluxe Room",
            quantity: 8,
            accessible: false,
            quiet: true,
            highFloor: true,
            groundFloor: false,
            booked: 2,
            available: 6
          },
          {
            id: 3,
            type: "Accessible Room",
            quantity: 4,
            accessible: true,
            quiet: false,
            highFloor: false,
            groundFloor: true,
            booked: 1,
            available: 3
          }
        ],
        transport: [
          {
            id: 101,
            type: "Sedan",
            capacity: 4,
            reserved: 2,
            available: 2,
            location: "Main Gate"
          },
          {
            id: 102,
            type: "SUV",
            capacity: 6,
            reserved: 3,
            available: 3,
            location: "Parking Lot A"
          },
          {
            id: 103,
            type: "Bus (32-seater)",
            capacity: 32,
            reserved: 0,
            available: 32,
            location: "Bus Stand"
          }
        ],
        dining: [
          {
            id: 201,
            mealType: "Breakfast",
            capacity: 80,
            booked: 45,
            available: 35,
            dietaryOptions: ["Vegetarian", "Non-Veg", "Vegan"],
            time: "7:00 AM - 9:00 AM"
          },
          {
            id: 202,
            mealType: "Lunch",
            capacity: 100,
            booked: 62,
            available: 38,
            dietaryOptions: ["Vegetarian", "Non-Veg", "Gluten-Free"],
            time: "12:30 PM - 2:00 PM"
          },
          {
            id: 203,
            mealType: "Dinner",
            capacity: 120,
            booked: 89,
            available: 31,
            dietaryOptions: ["Vegetarian", "Non-Veg", "Halal"],
            time: "7:00 PM - 9:00 PM"
          }
        ],
        activities: [
          {
            id: 301,
            name: "Yoga & Meditation",
            description: "Morning yoga session",
            capacity: 30,
            registered: 18,
            available: 12,
            time: "6:00 AM",
            duration: "1 Hour"
          },
          {
            id: 302,
            name: "Sightseeing Tour",
            description: "City tour with local guide",
            capacity: 40,
            registered: 35,
            available: 5,
            time: "10:00 AM",
            duration: "3 Hours"
          },
          {
            id: 303,
            name: "Adventure Sports",
            description: "Trekking and outdoor activities",
            capacity: 25,
            registered: 20,
            available: 5,
            time: "2:00 PM",
            duration: "4 Hours"
          },
          {
            id: 304,
            name: "Cultural Evening",
            description: "Local music and dance performance",
            capacity: 100,
            registered: 42,
            available: 58,
            time: "6:00 PM",
            duration: "2 Hours"
          }
        ]
      });
    }

    setInventory(inv);
    updateSummary(inv);
    updateOccupancy(inv);
    updateAlerts(inv);
    loadRecommendations();
  };

  const updateSummary = (inv) => {
    const summary = EventInventoryService.getInventorySummary(inv.eventId || eventId);
    setSummary(summary);
  };

  const updateOccupancy = (inv) => {
    const occupancy = EventInventoryService.getOccupancyRates(inv.eventId || eventId);
    setOccupancy(occupancy);
  };

  const updateAlerts = (inv) => {
    const alerts = EventInventoryService.getAvailabilityAlerts(inv.eventId || eventId);
    setAlerts(alerts);
  };

  const loadRecommendations = () => {
    const recs = ResourceAllocationEngine.getAllocationRecommendations(eventId);
    setRecommendations(recs);
  };

  const handleAvailabilityUpdate = ({ itemId, change, type }) => {
    try {
      if (type === "room") {
        EventInventoryService.updateRoomAvailability(eventId, itemId, change);
      } else if (type === "transport") {
        EventInventoryService.updateTransportAvailability(eventId, itemId, change);
      } else if (type === "dining") {
        EventInventoryService.updateDiningAvailability(eventId, itemId, change);
      } else if (type === "activity") {
        EventInventoryService.updateActivityAvailability(eventId, itemId, change);
      }
      loadInventory();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Delete this inventory item?")) {
      try {
        EventInventoryService.deleteInventoryItem(eventId, activeTab + "s", itemId);
        loadInventory();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    try {
      const eventId_to_use = inventory?.eventId || eventId;

      if (formType === "room") {
        EventInventoryService.addRoom(eventId_to_use, {
          type: formData.type || "Standard",
          quantity: parseInt(formData.quantity) || 1,
          accessible: formData.accessible || false,
          quiet: formData.quiet || false,
          highFloor: formData.highFloor || false,
          groundFloor: formData.groundFloor || false
        });
      } else if (formType === "transport") {
        EventInventoryService.addTransport(eventId_to_use, {
          type: formData.type || "Vehicle",
          capacity: parseInt(formData.capacity) || 1,
          location: formData.location || ""
        });
      } else if (formType === "dining") {
        EventInventoryService.addDiningOption(eventId_to_use, {
          mealType: formData.mealType || "Meal",
          capacity: parseInt(formData.capacity) || 1,
          dietaryOptions: (formData.dietaryOptions || "").split(",").map(d => d.trim()),
          time: formData.time || ""
        });
      } else if (formType === "activity") {
        EventInventoryService.addActivity(eventId_to_use, {
          name: formData.name || "Activity",
          description: formData.description || "",
          capacity: parseInt(formData.capacity) || 1,
          time: formData.time || "",
          duration: formData.duration || ""
        });
      }

      setFormData({});
      setShowAddForm(false);
      loadInventory();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleExportCSV = () => {
    const csv = EventInventoryService.exportInventoryAsCSV(eventId);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
    element.setAttribute("download", `inventory-${eventId}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleApplyRecommendations = (type) => {
    try {
      if (recommendations && recommendations[type]) {
        const response = ResourceAllocationEngine.applyAllocation(
          eventId,
          type,
          recommendations[type].suggestions
        );
        alert(`${response.appliedCount} allocations applied successfully!`);
        loadInventory();
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const renderInventoryItems = () => {
    let items = [];

    if (activeTab === "room" && inventory?.rooms) {
      items = inventory.rooms;
    } else if (activeTab === "transport" && inventory?.transport) {
      items = inventory.transport;
    } else if (activeTab === "dining" && inventory?.dining) {
      items = inventory.dining;
    } else if (activeTab === "activity" && inventory?.activities) {
      items = inventory.activities;
    }

    return items.map(item => (
      <InventoryCard
        key={item.id}
        item={item}
        type={activeTab}
        onUpdate={handleAvailabilityUpdate}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <div className="event-inventory-container fade-in">
      <div className="inventory-header">
        <h1>📦 Event Inventory Management</h1>
        <p>Real-time tracking and allocation of event resources</p>
      </div>

      {/* Availability Alerts */}
      {alerts.length > 0 && (
        <div className="alerts-section">
          <h2>⚠️ Availability Alerts</h2>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <div className="alert-title">{alert.title}</div>
                <div className="alert-message">{alert.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {summary && (
        <div className="summary-section">
          <h2>📊 Inventory Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon">🏨</div>
              <div className="summary-label">Rooms</div>
              <div className="summary-value">{summary.rooms.booked}/{summary.rooms.total}</div>
              <div className="summary-available">{summary.rooms.available} available</div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">🚗</div>
              <div className="summary-label">Transport</div>
              <div className="summary-value">{summary.transport.reserved}</div>
              <div className="summary-available">{summary.transport.availableSlots} available</div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">🍽️</div>
              <div className="summary-label">Dining</div>
              <div className="summary-value">{summary.dining.booked}</div>
              <div className="summary-available">{summary.dining.availableSeats} available</div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">🎯</div>
              <div className="summary-label">Activities</div>
              <div className="summary-value">{summary.activities.registered}</div>
              <div className="summary-available">{summary.activities.availableSlots} available</div>
            </div>
          </div>
        </div>
      )}

      {/* Occupancy Rates */}
      {occupancy && (
        <div className="occupancy-section">
          <h2>📈 Occupancy Rates</h2>
          <div className="occupancy-grid">
            <div className="occupancy-item">
              <div className="occupancy-label">Room Occupancy</div>
              <div className="occupancy-bar">
                <div className="occupancy-fill" style={{ width: `${occupancy.roomOccupancy}%` }} />
              </div>
              <div className="occupancy-percent">{occupancy.roomOccupancy}%</div>
            </div>

            <div className="occupancy-item">
              <div className="occupancy-label">Dining Occupancy</div>
              <div className="occupancy-bar">
                <div className="occupancy-fill" style={{ width: `${occupancy.diningOccupancy}%` }} />
              </div>
              <div className="occupancy-percent">{occupancy.diningOccupancy}%</div>
            </div>

            <div className="occupancy-item">
              <div className="occupancy-label">Activity Participation</div>
              <div className="occupancy-bar">
                <div className="occupancy-fill" style={{ width: `${occupancy.activityParticipation}%` }} />
              </div>
              <div className="occupancy-percent">{occupancy.activityParticipation}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="recommendations-section">
          <h2>🤖 Automated Resource Allocation Recommendations</h2>
          <div className="recommendations-grid">
            {recommendations.rooms.status === "ready" && (
              <div className="rec-card">
                <h3>🏨 Room Assignments</h3>
                <p>{recommendations.rooms.suggestions.length} assignments recommended</p>
                <button
                  className="btn-apply"
                  onClick={() => handleApplyRecommendations("rooms")}
                >
                  Apply Recommendations
                </button>
              </div>
            )}

            {recommendations.dining.status === "ready" && (
              <div className="rec-card">
                <h3>🍽️ Dining Allocation</h3>
                <p>{recommendations.dining.suggestions.length} options available</p>
                <button
                  className="btn-apply"
                  onClick={() => handleApplyRecommendations("dining")}
                >
                  Apply Recommendations
                </button>
              </div>
            )}

            {recommendations.activities.status === "ready" && (
              <div className="rec-card">
                <h3>🎯 Activity Suggestions</h3>
                <p>{recommendations.activities.suggestions.length} activities available</p>
                <button
                  className="btn-apply"
                  onClick={() => handleApplyRecommendations("activities")}
                >
                  Apply Recommendations
                </button>
              </div>
            )}

            {recommendations.transport.status === "ready" && (
              <div className="rec-card">
                <h3>🚗 Transport Options</h3>
                <p>{recommendations.transport.suggestions.length} options available</p>
                <button
                  className="btn-apply"
                  onClick={() => handleApplyRecommendations("transport")}
                >
                  Apply Recommendations
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inventory Management */}
      <div className="inventory-section">
        <div className="inventory-controls">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "room" ? "active" : ""}`}
              onClick={() => setActiveTab("room")}
            >
              🏨 Rooms
            </button>
            <button
              className={`tab-btn ${activeTab === "transport" ? "active" : ""}`}
              onClick={() => setActiveTab("transport")}
            >
              🚗 Transport
            </button>
            <button
              className={`tab-btn ${activeTab === "dining" ? "active" : ""}`}
              onClick={() => setActiveTab("dining")}
            >
              🍽️ Dining
            </button>
            <button
              className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              🎯 Activities
            </button>
          </div>

          <div className="action-buttons">
            <button
              className="btn-secondary"
              onClick={() => {
                setFormType(activeTab);
                setShowAddForm(true);
              }}
            >
              ➕ Add Item
            </button>
            <button className="btn-secondary" onClick={handleExportCSV}>
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="add-form-modal">
            <div className="form-container">
              <h3>Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</h3>
              <form onSubmit={handleAddItem}>
                {formType === "room" && (
                  <>
                    <input
                      type="text"
                      placeholder="Room Type"
                      value={formData.type || ""}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={formData.quantity || ""}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.accessible || false}
                        onChange={(e) => setFormData({ ...formData, accessible: e.target.checked })}
                      />
                      Wheelchair Accessible
                    </label>
                  </>
                )}
                {formType === "transport" && (
                  <>
                    <input
                      type="text"
                      placeholder="Transport Type"
                      value={formData.type || ""}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={formData.capacity || ""}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </>
                )}
                {formType === "dining" && (
                  <>
                    <input
                      type="text"
                      placeholder="Meal Type"
                      value={formData.mealType || ""}
                      onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={formData.capacity || ""}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Dietary Options (comma-separated)"
                      value={formData.dietaryOptions || ""}
                      onChange={(e) => setFormData({ ...formData, dietaryOptions: e.target.value })}
                    />
                  </>
                )}
                {formType === "activity" && (
                  <>
                    <input
                      type="text"
                      placeholder="Activity Name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="2"
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={formData.capacity || ""}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                  </>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-save">Save</button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inventory Items */}
        <div className="inventory-items">
          {renderInventoryItems().length > 0 ? (
            renderInventoryItems()
          ) : (
            <div className="empty-state">
              <p>No items in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventInventory;
