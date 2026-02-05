import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for guests and alerts (replace with database in production)
const guestStore = {
  guests: [],
  alerts: []
};

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ============================================
// GUEST PROFILES & PREFERENCES API ENDPOINTS
// ============================================

// GET all guests
app.get("/api/guests", (req, res) => {
  try {
    res.json({
      success: true,
      data: guestStore.guests,
      count: guestStore.guests.length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});

// GET a single guest by ID
app.get("/api/guests/:id", (req, res) => {
  try {
    const guest = guestStore.guests.find(g => g.id === parseInt(req.params.id));
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    res.json({ success: true, data: guest });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch guest" });
  }
});

// CREATE or UPDATE a guest profile
app.post("/api/guests", (req, res) => {
  try {
    const guestData = req.body;

    // Validate required fields
    if (!guestData.name) {
      return res.status(400).json({ error: "Guest name is required" });
    }

    const existingIndex = guestStore.guests.findIndex(
      g => g.id === guestData.id
    );

    let isUpdate = false;
    if (existingIndex >= 0) {
      isUpdate = true;
      guestStore.guests[existingIndex] = guestData;
    } else {
      guestStore.guests.push(guestData);
    }

    // Create alert for preference changes
    const alertType = isUpdate ? "preference_update" : "new_guest";
    const alertMessage = isUpdate
      ? `${guestData.name}'s preferences have been updated`
      : `${guestData.name} has been added to the guest list`;

    const alert = {
      id: Date.now(),
      type: alertType,
      title: isUpdate ? "Guest Preference Updated" : "New Guest Added",
      message: alertMessage,
      guestName: guestData.name,
      timestamp: new Date().toISOString()
    };

    guestStore.alerts.unshift(alert);
    if (guestStore.alerts.length > 100) {
      guestStore.alerts.pop();
    }

    res.json({
      success: true,
      message: isUpdate ? "Guest updated successfully" : "Guest added successfully",
      data: guestData,
      alert: alert
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to save guest" });
  }
});

// DELETE a guest
app.delete("/api/guests/:id", (req, res) => {
  try {
    const guestId = parseInt(req.params.id);
    const guestIndex = guestStore.guests.findIndex(g => g.id === guestId);

    if (guestIndex === -1) {
      return res.status(404).json({ error: "Guest not found" });
    }

    const removedGuest = guestStore.guests.splice(guestIndex, 1)[0];

    const alert = {
      id: Date.now(),
      type: "guest_removed",
      title: "Guest Removed",
      message: `${removedGuest.name} has been removed from the guest list`,
      guestName: removedGuest.name,
      timestamp: new Date().toISOString()
    };

    guestStore.alerts.unshift(alert);

    res.json({
      success: true,
      message: "Guest deleted successfully",
      alert: alert
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete guest" });
  }
});

// GET dietary requirements summary
app.get("/api/guests/analytics/dietary", (req, res) => {
  try {
    const summary = {};
    guestStore.guests.forEach(guest => {
      guest.dietaryRequirements.forEach(diet => {
        summary[diet] = (summary[diet] || 0) + 1;
      });
    });

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch dietary summary" });
  }
});

// GET special needs summary
app.get("/api/guests/analytics/special-needs", (req, res) => {
  try {
    const summary = {
      wheelchairAccessible: guestStore.guests.filter(g => g.wheelchairAccessible).length,
      mobilityAssistance: guestStore.guests.filter(g => g.mobilityAssistance).length,
      totalGuests: guestStore.guests.length,
      withSpecialNeeds: guestStore.guests.filter(g => g.specialNeeds.length > 0).length
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch special needs summary" });
  }
});

// GET all alerts
app.get("/api/alerts", (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    const alerts = guestStore.alerts.slice(0, limit);

    res.json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// DISMISS an alert
app.delete("/api/alerts/:id", (req, res) => {
  try {
    const alertId = parseInt(req.params.id);
    const alertIndex = guestStore.alerts.findIndex(a => a.id === alertId);

    if (alertIndex === -1) {
      return res.status(404).json({ error: "Alert not found" });
    }

    guestStore.alerts.splice(alertIndex, 1);

    res.json({
      success: true,
      message: "Alert dismissed successfully"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to dismiss alert" });
  }
});

// CLEAR all alerts
app.delete("/api/alerts", (req, res) => {
  try {
    guestStore.alerts = [];

    res.json({
      success: true,
      message: "All alerts cleared"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to clear alerts" });
  }
});

// GET guest report
app.get("/api/guests/report/summary", (req, res) => {
  try {
    const dietarySummary = {};
    guestStore.guests.forEach(guest => {
      guest.dietaryRequirements.forEach(diet => {
        dietarySummary[diet] = (dietarySummary[diet] || 0) + 1;
      });
    });

    const report = {
      totalGuests: guestStore.guests.length,
      dietarySummary,
      specialNeedsSummary: {
        wheelchairAccessible: guestStore.guests.filter(g => g.wheelchairAccessible).length,
        mobilityAssistance: guestStore.guests.filter(g => g.mobilityAssistance).length
      },
      guestsList: guestStore.guests,
      generatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

// 🔥 MAIN API: frontend will call this
app.post("/api/hotels", async (req, res) => {
  try {
    const response = await axios.post(
      process.env.TBO_API_URL,
      req.body,
      {
        auth: {
          username: process.env.TBO_USERNAME,
          password: process.env.TBO_PASSWORD
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "TBO API failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
  console.log("Guest Preferences API endpoints available:");
  console.log("  GET    /api/guests");
  console.log("  POST   /api/guests");
  console.log("  DELETE /api/guests/:id");
  console.log("  GET    /api/alerts");
  console.log("  DELETE /api/alerts/:id");
});
