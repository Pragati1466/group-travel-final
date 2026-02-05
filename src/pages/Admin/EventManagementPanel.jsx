import { useState, useEffect } from "react";
import EventCoordinationService from "../../services/EventCoordinationService";
import EventForm from "./EventForm";
import "./EventManagementPanel.css";

const EventManagementPanel = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load events on mount
  useEffect(() => {
    loadEvents();
    
    // Subscribe to real-time updates
    const unsubscribe = EventCoordinationService.subscribeToAdminUpdates((update) => {
      loadEvents();
      showNotification(`Event ${update.action}d: Success!`, "success");
    });

    return unsubscribe;
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(e => e.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(e => e.status === filterStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, filterType, filterStatus]);

  const loadEvents = () => {
    try {
      const allEvents = EventCoordinationService.getAllEvents();
      const statsData = EventCoordinationService.getEventStats();
      
      setEvents(allEvents);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading events:", error);
      showNotification("Error loading events", "error");
    }
  };

  const showNotification = (text, type = "info") => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleCreateNew = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        setLoading(true);
        EventCoordinationService.deleteEvent(eventId);
        showNotification("Event deleted successfully", "success");
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
        showNotification("Error deleting event", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = (formData) => {
    try {
      setLoading(true);
      if (editingEvent) {
        EventCoordinationService.updateEvent(editingEvent.id, formData);
        showNotification("Event updated successfully", "success");
      } else {
        EventCoordinationService.createEvent(formData);
        showNotification("Event created successfully", "success");
      }
      setShowForm(false);
      setEditingEvent(null);
      loadEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      showNotification("Error saving event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-management-panel">
      {/* Header */}
      <div className="emp-header">
        <div className="emp-title-section">
          <h2>📅 Event Management</h2>
          <p>Create, edit, and manage all group events in real-time</p>
        </div>
        <button className="btn-create-event" onClick={handleCreateNew}>
          ➕ Create New Event
        </button>
      </div>

      {/* Notification */}
      {message.text && (
        <div className={`notification notification-${message.type}`}>
          {message.type === "success" && "✅"} {message.text}
        </div>
      )}

      {/* Stats Overview */}
      {stats && (
        <div className="emp-stats">
          <StatBox label="Total Events" value={stats.totalEvents} icon="🎫" color="#3b82f6" />
          <StatBox label="Confirmed" value={stats.confirmedEvents} icon="✅" color="#10b981" />
          <StatBox label="Planning" value={stats.planningEvents} icon="📋" color="#f59e0b" />
          <StatBox label="Total Guests" value={stats.totalGuests} icon="👥" color="#8b5cf6" />
        </div>
      )}

      {/* Filters & Search */}
      <div className="emp-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search events by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="wedding">Wedding</option>
          <option value="conference">Conference</option>
          <option value="mice">Corporate/MICE</option>
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="confirmed">Confirmed</option>
        </select>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => !loading && setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <EventForm
              event={editingEvent}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="events-list">
        <h3>Events ({filteredEvents.length})</h3>
        
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <p>📭 No events found. Create your first event!</p>
          </div>
        ) : (
          <div className="events-table">
            <div className="table-header">
              <div className="col-name">Event Name</div>
              <div className="col-type">Type</div>
              <div className="col-location">Location</div>
              <div className="col-guests">Guests</div>
              <div className="col-dates">Dates</div>
              <div className="col-status">Status</div>
              <div className="col-actions">Actions</div>
            </div>

            {filteredEvents.map((event) => (
              <div key={event.id} className="table-row">
                <div className="col-name">
                  <div className="event-name-cell">
                    <span className="event-logo">{event.logo}</span>
                    <div>
                      <div className="event-title">{event.name}</div>
                      <div className="event-organizer">{event.organizer}</div>
                    </div>
                  </div>
                </div>
                <div className="col-type">
                  <span className={`badge badge-${event.type}`}>{event.type}</span>
                </div>
                <div className="col-location">{event.location}</div>
                <div className="col-guests">
                  <span className="guest-count">{event.guestCount}</span>
                </div>
                <div className="col-dates">
                  <div className="date-range">
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="col-status">
                  <span className={`status-badge status-${event.status}`}>
                    {event.status}
                  </span>
                </div>
                <div className="col-actions">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEditEvent(event)}
                    title="Edit event"
                    disabled={loading}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete event"
                    disabled={loading}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Box Component
const StatBox = ({ label, value, icon, color }) => (
  <div className="stat-box" style={{ borderTopColor: color }}>
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div className="stat-details">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

export default EventManagementPanel;
