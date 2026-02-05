/**
 * Event Coordination Service
 * Manages event microsites, itineraries, schedules, and personalized guest information
 * Handles centralized coordination for group events (weddings, conferences, MICE)
 */

class EventCoordinationService {
  static events = [
    {
      id: 1,
      name: "Sharma–Verma Wedding",
      type: "wedding",
      description: "Destination wedding with 200+ guests",
      location: "Gangtok, Sikkim",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      status: "confirmed",
      organizer: "Priya Sharma",
      logo: "💍",
      hotel: "Grand Himalayan Resort",
      guestCount: 230,
      budget: "₹50,00,000"
    },
    {
      id: 2,
      name: "TechConf 2024",
      type: "conference",
      description: "International Tech Conference with 500+ attendees",
      location: "Bangalore, India",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
      status: "confirmed",
      organizer: "Tech India Inc.",
      logo: "💻",
      hotel: "Bangalore Convention Center",
      guestCount: 520,
      budget: "₹1,50,00,000"
    },
    {
      id: 3,
      name: "Annual MICE Retreat",
      type: "mice",
      description: "Corporate team building and networking event",
      location: "Goa, India",
      startDate: "2024-10-10",
      endDate: "2024-10-13",
      status: "planning",
      organizer: "Corporate Events Ltd.",
      logo: "🏢",
      hotel: "Taj Exotica Resort",
      guestCount: 150,
      budget: "₹25,00,000"
    }
  ];

  static schedules = [
    {
      id: 1,
      eventId: 1,
      day: 1,
      date: "2024-12-20",
      title: "Arrival & Welcome",
      activities: [
        { time: "14:00-16:00", name: "Guest Arrival & Check-in", location: "Grand Himalayan Resort" },
        { time: "17:00-18:00", name: "Welcome Tea", location: "Grand Ballroom" },
        { time: "19:00-21:00", name: "Welcome Dinner", location: "Grand Dining Hall", dietary: true }
      ]
    },
    {
      id: 2,
      eventId: 1,
      day: 2,
      date: "2024-12-21",
      title: "Wedding Day",
      activities: [
        { time: "08:00-09:00", name: "Breakfast", location: "Hotel Restaurant" },
        { time: "09:00-14:00", name: "Pre-Wedding Photography", location: "Hotel Gardens" },
        { time: "14:00-15:30", name: "Lunch", location: "Multi-Cuisine Restaurant", dietary: true },
        { time: "17:00-19:00", name: "Wedding Ceremony", location: "Grand Lawn", formal: true },
        { time: "19:00-22:00", name: "Wedding Reception", location: "Grand Ballroom", dietary: true }
      ]
    }
  ];

  static itineraries = {
    1: { guestId: 1, eventId: 1, personalItinerary: [
      { day: 1, activity: "Arrival at 14:30", notes: "Room 501, Deluxe Double" },
      { day: 2, activity: "Wedding Ceremony at 17:00", notes: "Formal attire required" },
      { day: 3, activity: "Checkout at 12:00", notes: "Hotel checkout time" }
    ]},
    2: { guestId: 2, eventId: 1, personalItinerary: [
      { day: 1, activity: "Arrival at 16:00", notes: "Room 502, Deluxe Double" },
      { day: 2, activity: "Wedding Ceremony at 17:00", notes: "Formal attire. Dietary: Vegetarian" }
    ]}
  };

  static guestPersonalization = {
    1: {
      guestId: 1,
      eventId: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      hotelAssignment: {
        hotel: "Grand Himalayan Resort",
        roomNumber: "501",
        roomType: "Deluxe Double",
        floor: 5,
        checkIn: "2024-12-20 14:00",
        checkOut: "2024-12-22 12:00"
      },
      diningPreferences: ["Vegetarian", "No Onion", "No Garlic"],
      specialRequests: "Ground floor preferred",
      transportationNeeds: "Airport pickup required",
      accessibility: "Wheelchair accessible room",
      emergencyContact: "+91-9876543210",
      dietaryRestrictions: ["Vegetarian"]
    },
    2: {
      guestId: 2,
      eventId: 1,
      name: "Priya Sharma",
      email: "priya@example.com",
      hotelAssignment: {
        hotel: "Grand Himalayan Resort",
        roomNumber: "502",
        roomType: "Deluxe Double",
        floor: 5,
        checkIn: "2024-12-20 13:30",
        checkOut: "2024-12-22 12:00"
      },
      diningPreferences: ["Vegan", "Gluten-Free"],
      specialRequests: "High floor preferred - city view",
      transportationNeeds: "Airport pickup required",
      accessibility: null,
      emergencyContact: "+91-9876543211",
      dietaryRestrictions: ["Vegan", "Gluten-Free"]
    }
  };

  static updates = [
    { id: 1, eventId: 1, timestamp: new Date("2024-12-15T10:30:00"), type: "schedule", message: "Dinner time updated from 8:00 PM to 8:30 PM", severity: "info", read: false },
    { id: 2, eventId: 1, timestamp: new Date("2024-12-14T14:20:00"), type: "accommodation", message: "Room upgrade available for guests in Block A", severity: "success", read: false },
    { id: 3, eventId: 1, timestamp: new Date("2024-12-13T09:15:00"), type: "activity", message: "Pre-wedding photo session rescheduled to 9:00 AM", severity: "warning", read: false },
    { id: 4, eventId: 1, timestamp: new Date("2024-12-12T16:45:00"), type: "transport", message: "Airport shuttle schedule confirmed", severity: "info", read: true }
  ];

  /**
   * Get event by ID
   */
  static getEventById(eventId) {
    return this.events.find(e => e.id === eventId);
  }

  /**
   * Get all events
   */
  static getAllEvents() {
    return this.events;
  }

  /**
   * Get event schedule
   */
  static getEventSchedule(eventId) {
    return this.schedules.filter(s => s.eventId === eventId);
  }

  /**
   * Get guest's personalized itinerary
   */
  static getGuestItinerary(guestId, eventId) {
    return this.itineraries[guestId] || null;
  }

  /**
   * Get guest personalization details
   */
  static getGuestPersonalization(guestId, eventId) {
    return this.guestPersonalization[guestId] || null;
  }

  /**
   * Get real-time updates for event
   */
  static getEventUpdates(eventId) {
    return this.updates.filter(u => u.eventId === eventId).sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Add new update to event (simulates real-time push)
   */
  static addEventUpdate(eventId, updateData) {
    const newUpdate = {
      id: Math.max(...this.updates.map(u => u.id), 0) + 1,
      eventId,
      timestamp: new Date(),
      ...updateData
    };
    this.updates.unshift(newUpdate);
    this.notifyUpdateSubscribers(newUpdate);
    return newUpdate;
  }

  /**
   * Mark update as read
   */
  static markUpdateAsRead(updateId) {
    const update = this.updates.find(u => u.id === updateId);
    if (update) {
      update.read = true;
    }
  }

  /**
   * Get event statistics
   */
  static getEventStats(eventId) {
    const event = this.getEventById(eventId);
    const schedule = this.getEventSchedule(eventId);
    const updates = this.getEventUpdates(eventId);

    return {
      eventName: event?.name,
      totalGuests: event?.guestCount || 0,
      totalActivities: schedule.reduce((sum, day) => sum + day.activities.length, 0),
      totalDays: schedule.length,
      unreadUpdates: updates.filter(u => !u.read).length,
      lastUpdate: updates[0]?.timestamp || null
    };
  }

  /**
   * Get all guest information for event
   */
  static getEventGuests(eventId) {
    return Object.values(this.guestPersonalization).filter(
      g => g.eventId === eventId
    );
  }

  /**
   * Update guest preferences
   */
  static updateGuestPreferences(guestId, preferences) {
    if (this.guestPersonalization[guestId]) {
      this.guestPersonalization[guestId] = {
        ...this.guestPersonalization[guestId],
        ...preferences
      };
      return this.guestPersonalization[guestId];
    }
    return null;
  }

  /**
   * Get dietary requirements summary
   */
  static getDietarySummary(eventId) {
    const guests = this.getEventGuests(eventId);
    const dietary = {};

    guests.forEach(guest => {
      guest.dietaryRestrictions.forEach(restriction => {
        dietary[restriction] = (dietary[restriction] || 0) + 1;
      });
    });

    return dietary;
  }

  /**
   * Get accessibility requirements summary
   */
  static getAccessibilitySummary(eventId) {
    const guests = this.getEventGuests(eventId);

    return {
      wheelchairAccessible: guests.filter(g => g.hotelAssignment?.wheelchairAccessible).length,
      mobilityAssistance: guests.filter(g => g.accessibility && g.accessibility.includes("Mobility")).length,
      groundFloor: guests.filter(g => g.hotelAssignment?.floor === 1).length,
      specialRequests: guests.filter(g => g.specialRequests).length
    };
  }

  // Subscribers for real-time updates
  static updateSubscribers = [];

  /**
   * Subscribe to event updates
   */
  static subscribeToUpdates(callback) {
    this.updateSubscribers.push(callback);
    return () => {
      this.updateSubscribers = this.updateSubscribers.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify subscribers of new updates
   */
  static notifyUpdateSubscribers(update) {
    this.updateSubscribers.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error("Error notifying update subscriber:", error);
      }
    });
  }

  /**
   * Export event data as JSON
   */
  static exportEventData(eventId) {
    return {
      event: this.getEventById(eventId),
      schedule: this.getEventSchedule(eventId),
      guests: this.getEventGuests(eventId),
      updates: this.getEventUpdates(eventId),
      dietary: this.getDietarySummary(eventId),
      accessibility: this.getAccessibilitySummary(eventId)
    };
  }

  /**
   * Export event data as CSV
   */
  static exportEventAsCSV(eventId) {
    const guests = this.getEventGuests(eventId);

    if (guests.length === 0) return "";

    const headers = [
      "Guest Name",
      "Email",
      "Room Number",
      "Room Type",
      "Check-in",
      "Dietary Requirements",
      "Special Requests",
      "Emergency Contact"
    ];

    const rows = guests.map(guest => [
      guest.name,
      guest.email,
      guest.hotelAssignment?.roomNumber || "N/A",
      guest.hotelAssignment?.roomType || "N/A",
      guest.hotelAssignment?.checkIn || "N/A",
      guest.dietaryRestrictions?.join(";") || "None",
      guest.specialRequests || "None",
      guest.emergencyContact
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    return csv;
  }

  /**
   * ADMIN METHODS - Event Management CRUD Operations
   */

  /**
   * Get all events with optional filtering
   */
  static getAllEvents(filter = {}) {
    return this.events.filter(event => {
      if (filter.type && event.type !== filter.type) return false;
      if (filter.status && event.status !== filter.status) return false;
      if (filter.search) {
        const search = filter.search.toLowerCase();
        return event.name.toLowerCase().includes(search) || 
               event.location.toLowerCase().includes(search);
      }
      return true;
    });
  }

  /**
   * Create a new event
   */
  static createEvent(eventData) {
    const newEvent = {
      id: Math.max(...this.events.map(e => e.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...eventData
    };
    this.events.push(newEvent);
    this.notifyAdminSubscribers({ action: 'create', event: newEvent });
    return newEvent;
  }

  /**
   * Update an existing event
   */
  static updateEvent(eventId, eventData) {
    const index = this.events.findIndex(e => e.id === eventId);
    if (index === -1) throw new Error("Event not found");
    
    const updatedEvent = {
      ...this.events[index],
      ...eventData,
      updatedAt: new Date().toISOString()
    };
    this.events[index] = updatedEvent;
    this.notifyAdminSubscribers({ action: 'update', event: updatedEvent });
    return updatedEvent;
  }

  /**
   * Delete an event
   */
  static deleteEvent(eventId) {
    const index = this.events.findIndex(e => e.id === eventId);
    if (index === -1) throw new Error("Event not found");
    
    const deletedEvent = this.events[index];
    this.events.splice(index, 1);
    this.notifyAdminSubscribers({ action: 'delete', eventId });
    return deletedEvent;
  }

  /**
   * Get event statistics
   */
  static getEventStats() {
    return {
      totalEvents: this.events.length,
      confirmedEvents: this.events.filter(e => e.status === 'confirmed').length,
      planningEvents: this.events.filter(e => e.status === 'planning').length,
      totalGuests: this.events.reduce((sum, e) => sum + e.guestCount, 0),
      totalBudget: this.calculateTotalBudget(),
      eventsByType: this.groupEventsByType()
    };
  }

  /**
   * Calculate total budget
   */
  static calculateTotalBudget() {
    return this.events.reduce((sum, event) => {
      const amount = parseInt(event.budget?.replace(/[₹,]/g, '')) || 0;
      return sum + amount;
    }, 0);
  }

  /**
   * Group events by type
   */
  static groupEventsByType() {
    const types = {};
    this.events.forEach(event => {
      types[event.type] = (types[event.type] || 0) + 1;
    });
    return types;
  }

  /**
   * Admin subscribers for real-time updates
   */
  static adminSubscribers = [];

  static subscribeToAdminUpdates(callback) {
    this.adminSubscribers.push(callback);
    return () => {
      const index = this.adminSubscribers.indexOf(callback);
      if (index > -1) this.adminSubscribers.splice(index, 1);
    };
  }

  static notifyAdminSubscribers(update) {
    this.adminSubscribers.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error("Error notifying admin subscriber:", error);
      }
    });
  }
}

export default EventCoordinationService;
