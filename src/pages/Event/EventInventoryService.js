/**
 * Event Inventory Service
 * Manages rooms, transport, dining, and activities for events
 * Tracks availability and allocation in real-time
 */

const INVENTORY_STORAGE_KEY = "event_inventory";
const ALLOCATION_STORAGE_KEY = "event_allocations";

class EventInventoryService {
  /**
   * Initialize inventory for a new event
   */
  static initializeEventInventory(eventData) {
    try {
      const inventory = {
        eventId: eventData.eventId,
        eventName: eventData.eventName,
        eventDate: eventData.eventDate,
        rooms: eventData.rooms || [],
        transport: eventData.transport || [],
        dining: eventData.dining || [],
        activities: eventData.activities || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.saveInventory(inventory);
      return inventory;
    } catch (error) {
      console.error("Error initializing inventory:", error);
      throw error;
    }
  }

  /**
   * Save inventory data
   */
  static saveInventory(inventory) {
    try {
      const allInventories = this.getAllInventories();
      const existingIndex = allInventories.findIndex(i => i.eventId === inventory.eventId);

      if (existingIndex >= 0) {
        allInventories[existingIndex] = {
          ...inventory,
          updatedAt: new Date().toISOString()
        };
      } else {
        allInventories.push(inventory);
      }

      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(allInventories));
      return inventory;
    } catch (error) {
      console.error("Error saving inventory:", error);
      throw error;
    }
  }

  /**
   * Get inventory for specific event
   */
  static getEventInventory(eventId) {
    try {
      const allInventories = this.getAllInventories();
      return allInventories.find(i => i.eventId === eventId) || null;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      return null;
    }
  }

  /**
   * Get all inventories
   */
  static getAllInventories() {
    try {
      const data = localStorage.getItem(INVENTORY_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving inventories:", error);
      return [];
    }
  }

  /**
   * Add room to inventory
   */
  static addRoom(eventId, roomData) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const room = {
        id: Date.now(),
        ...roomData,
        booked: 0,
        available: roomData.quantity,
        createdAt: new Date().toISOString()
      };

      inventory.rooms.push(room);
      this.saveInventory(inventory);
      return room;
    } catch (error) {
      console.error("Error adding room:", error);
      throw error;
    }
  }

  /**
   * Update room availability
   */
  static updateRoomAvailability(eventId, roomId, change) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const room = inventory.rooms.find(r => r.id === roomId);
      if (!room) throw new Error("Room not found");

      const newAvailable = Math.max(0, room.available + change);
      const newBooked = room.quantity - newAvailable;

      if (newBooked > room.quantity) {
        throw new Error("Cannot overbook - insufficient rooms");
      }

      room.available = newAvailable;
      room.booked = newBooked;

      this.saveInventory(inventory);
      return room;
    } catch (error) {
      console.error("Error updating room availability:", error);
      throw error;
    }
  }

  /**
   * Get available rooms
   */
  static getAvailableRooms(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return [];
      return inventory.rooms.filter(r => r.available > 0);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      return [];
    }
  }

  /**
   * Add transport option
   */
  static addTransport(eventId, transportData) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const transport = {
        id: Date.now(),
        ...transportData,
        reserved: 0,
        available: transportData.capacity,
        createdAt: new Date().toISOString()
      };

      inventory.transport.push(transport);
      this.saveInventory(inventory);
      return transport;
    } catch (error) {
      console.error("Error adding transport:", error);
      throw error;
    }
  }

  /**
   * Update transport availability
   */
  static updateTransportAvailability(eventId, transportId, change) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const transport = inventory.transport.find(t => t.id === transportId);
      if (!transport) throw new Error("Transport not found");

      const newAvailable = Math.max(0, transport.available + change);
      const newReserved = transport.capacity - newAvailable;

      if (newReserved > transport.capacity) {
        throw new Error("Cannot overbook - insufficient capacity");
      }

      transport.available = newAvailable;
      transport.reserved = newReserved;

      this.saveInventory(inventory);
      return transport;
    } catch (error) {
      console.error("Error updating transport availability:", error);
      throw error;
    }
  }

  /**
   * Get available transport
   */
  static getAvailableTransport(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return [];
      return inventory.transport.filter(t => t.available > 0);
    } catch (error) {
      console.error("Error fetching available transport:", error);
      return [];
    }
  }

  /**
   * Add dining option
   */
  static addDiningOption(eventId, diningData) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const dining = {
        id: Date.now(),
        ...diningData,
        booked: 0,
        available: diningData.capacity,
        createdAt: new Date().toISOString()
      };

      inventory.dining.push(dining);
      this.saveInventory(inventory);
      return dining;
    } catch (error) {
      console.error("Error adding dining option:", error);
      throw error;
    }
  }

  /**
   * Update dining availability
   */
  static updateDiningAvailability(eventId, diningId, change) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const dining = inventory.dining.find(d => d.id === diningId);
      if (!dining) throw new Error("Dining option not found");

      const newAvailable = Math.max(0, dining.available + change);
      const newBooked = dining.capacity - newAvailable;

      if (newBooked > dining.capacity) {
        throw new Error("Cannot overbook - insufficient capacity");
      }

      dining.available = newAvailable;
      dining.booked = newBooked;

      this.saveInventory(inventory);
      return dining;
    } catch (error) {
      console.error("Error updating dining availability:", error);
      throw error;
    }
  }

  /**
   * Get available dining options
   */
  static getAvailableDining(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return [];
      return inventory.dining.filter(d => d.available > 0);
    } catch (error) {
      console.error("Error fetching available dining:", error);
      return [];
    }
  }

  /**
   * Add activity
   */
  static addActivity(eventId, activityData) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const activity = {
        id: Date.now(),
        ...activityData,
        registered: 0,
        available: activityData.capacity,
        createdAt: new Date().toISOString()
      };

      inventory.activities.push(activity);
      this.saveInventory(inventory);
      return activity;
    } catch (error) {
      console.error("Error adding activity:", error);
      throw error;
    }
  }

  /**
   * Update activity availability
   */
  static updateActivityAvailability(eventId, activityId, change) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const activity = inventory.activities.find(a => a.id === activityId);
      if (!activity) throw new Error("Activity not found");

      const newAvailable = Math.max(0, activity.available + change);
      const newRegistered = activity.capacity - newAvailable;

      if (newRegistered > activity.capacity) {
        throw new Error("Cannot over-register - insufficient capacity");
      }

      activity.available = newAvailable;
      activity.registered = newRegistered;

      this.saveInventory(inventory);
      return activity;
    } catch (error) {
      console.error("Error updating activity availability:", error);
      throw error;
    }
  }

  /**
   * Get available activities
   */
  static getAvailableActivities(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return [];
      return inventory.activities.filter(a => a.available > 0);
    } catch (error) {
      console.error("Error fetching available activities:", error);
      return [];
    }
  }

  /**
   * Get inventory summary
   */
  static getInventorySummary(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return null;

      return {
        eventName: inventory.eventName,
        rooms: {
          total: inventory.rooms.reduce((sum, r) => sum + r.quantity, 0),
          available: inventory.rooms.reduce((sum, r) => sum + r.available, 0),
          booked: inventory.rooms.reduce((sum, r) => sum + r.booked, 0)
        },
        transport: {
          total: inventory.transport.length,
          availableSlots: inventory.transport.reduce((sum, t) => sum + t.available, 0),
          reserved: inventory.transport.reduce((sum, t) => sum + t.reserved, 0)
        },
        dining: {
          total: inventory.dining.length,
          availableSeats: inventory.dining.reduce((sum, d) => sum + d.available, 0),
          booked: inventory.dining.reduce((sum, d) => sum + d.booked, 0)
        },
        activities: {
          total: inventory.activities.length,
          availableSlots: inventory.activities.reduce((sum, a) => sum + a.available, 0),
          registered: inventory.activities.reduce((sum, a) => sum + a.registered, 0)
        }
      };
    } catch (error) {
      console.error("Error generating summary:", error);
      return null;
    }
  }

  /**
   * Get occupancy rates
   */
  static getOccupancyRates(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return null;

      const roomsTotal = inventory.rooms.reduce((sum, r) => sum + r.quantity, 0);
      const roomsBooked = inventory.rooms.reduce((sum, r) => sum + r.booked, 0);

      const diningTotal = inventory.dining.reduce((sum, d) => sum + d.capacity, 0);
      const diningBooked = inventory.dining.reduce((sum, d) => sum + d.booked, 0);

      const activitiesTotal = inventory.activities.reduce((sum, a) => sum + a.capacity, 0);
      const activitiesRegistered = inventory.activities.reduce((sum, a) => sum + a.registered, 0);

      return {
        roomOccupancy: roomsTotal > 0 ? Math.round((roomsBooked / roomsTotal) * 100) : 0,
        diningOccupancy: diningTotal > 0 ? Math.round((diningBooked / diningTotal) * 100) : 0,
        activityParticipation: activitiesTotal > 0 ? Math.round((activitiesRegistered / activitiesTotal) * 100) : 0
      };
    } catch (error) {
      console.error("Error calculating occupancy rates:", error);
      return null;
    }
  }

  /**
   * Get availability alerts
   */
  static getAvailabilityAlerts(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return [];

      const alerts = [];

      // Check room availability
      inventory.rooms.forEach(room => {
        const occupancyRate = (room.booked / room.quantity) * 100;
        if (occupancyRate >= 90) {
          alerts.push({
            id: `room_${room.id}`,
            type: "critical",
            title: "Room Availability Critical",
            message: `${room.type} rooms almost full (${room.available} left)`,
            resource: "rooms",
            resourceId: room.id
          });
        } else if (occupancyRate >= 70) {
          alerts.push({
            id: `room_${room.id}`,
            type: "warning",
            title: "Room Availability Low",
            message: `${room.type} rooms getting booked (${room.available} left)`,
            resource: "rooms",
            resourceId: room.id
          });
        }
      });

      // Check transport availability
      inventory.transport.forEach(transport => {
        const occupancyRate = (transport.reserved / transport.capacity) * 100;
        if (occupancyRate >= 90) {
          alerts.push({
            id: `transport_${transport.id}`,
            type: "critical",
            title: "Transport Capacity Critical",
            message: `${transport.type} almost full (${transport.available} seats left)`,
            resource: "transport",
            resourceId: transport.id
          });
        }
      });

      // Check dining availability
      inventory.dining.forEach(dining => {
        const occupancyRate = (dining.booked / dining.capacity) * 100;
        if (occupancyRate >= 90) {
          alerts.push({
            id: `dining_${dining.id}`,
            type: "critical",
            title: "Dining Reservation Critical",
            message: `${dining.mealType} almost fully booked (${dining.available} seats left)`,
            resource: "dining",
            resourceId: dining.id
          });
        }
      });

      // Check activity registration
      inventory.activities.forEach(activity => {
        const occupancyRate = (activity.registered / activity.capacity) * 100;
        if (occupancyRate >= 90) {
          alerts.push({
            id: `activity_${activity.id}`,
            type: "critical",
            title: "Activity Slots Full",
            message: `${activity.name} almost fully registered (${activity.available} slots left)`,
            resource: "activities",
            resourceId: activity.id
          });
        }
      });

      return alerts;
    } catch (error) {
      console.error("Error getting availability alerts:", error);
      return [];
    }
  }

  /**
   * Delete inventory item
   */
  static deleteInventoryItem(eventId, type, itemId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) throw new Error("Event inventory not found");

      const validTypes = ["rooms", "transport", "dining", "activities"];
      if (!validTypes.includes(type)) {
        throw new Error("Invalid inventory type");
      }

      inventory[type] = inventory[type].filter(item => item.id !== itemId);
      this.saveInventory(inventory);
      return true;
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  }

  /**
   * Export inventory as CSV
   */
  static exportInventoryAsCSV(eventId) {
    try {
      const inventory = this.getEventInventory(eventId);
      if (!inventory) return "";

      let csv = `Event Inventory Report for ${inventory.eventName}\n`;
      csv += `Generated: ${new Date().toISOString()}\n\n`;

      // Rooms
      csv += "ROOMS\n";
      csv += "Type,Quantity,Booked,Available\n";
      inventory.rooms.forEach(room => {
        csv += `${room.type},${room.quantity},${room.booked},${room.available}\n`;
      });

      csv += "\nTRANSPORT\n";
      csv += "Type,Capacity,Reserved,Available\n";
      inventory.transport.forEach(transport => {
        csv += `${transport.type},${transport.capacity},${transport.reserved},${transport.available}\n`;
      });

      csv += "\nDINING\n";
      csv += "Meal Type,Capacity,Booked,Available\n";
      inventory.dining.forEach(dining => {
        csv += `${dining.mealType},${dining.capacity},${dining.booked},${dining.available}\n`;
      });

      csv += "\nACTIVITIES\n";
      csv += "Name,Capacity,Registered,Available\n";
      inventory.activities.forEach(activity => {
        csv += `${activity.name},${activity.capacity},${activity.registered},${activity.available}\n`;
      });

      return csv;
    } catch (error) {
      console.error("Error exporting inventory:", error);
      return "";
    }
  }
}

export default EventInventoryService;
