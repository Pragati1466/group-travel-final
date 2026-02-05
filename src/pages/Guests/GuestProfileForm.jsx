import { useState } from "react";
import "./GuestProfile.css";

const GuestProfileForm = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    guest || {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      roomPreference: "standard",
      dietaryRequirements: [],
      specialNeeds: [],
      mobilityAssistance: false,
      wheelchairAccessible: false,
      highFloor: false,
      groundFloor: false,
      quietRoom: false,
      notes: "",
      updatedAt: new Date().toISOString()
    }
  );

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Kosher",
    "Dairy-Free",
    "Nut-Free"
  ];

  const specialNeedsOptions = [
    "Wheelchair Accessibility",
    "Mobility Assistance",
    "Visual Impairment Support",
    "Hearing Impairment Support",
    "Service Animal Accommodation"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleDietaryToggle = (diet) => {
    setFormData(prev => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.includes(diet)
        ? prev.dietaryRequirements.filter(d => d !== diet)
        : [...prev.dietaryRequirements, diet],
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSpecialNeedsToggle = (need) => {
    setFormData(prev => ({
      ...prev,
      specialNeeds: prev.specialNeeds.includes(need)
        ? prev.specialNeeds.filter(n => n !== need)
        : [...prev.specialNeeds, need],
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter guest name");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="guest-profile-form-overlay">
      <div className="guest-profile-form-container">
        <h2>{guest ? "Edit Guest Profile" : "Add New Guest Profile"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <h3>📋 Basic Information</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter guest name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="guest@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Room Preferences */}
          <div className="form-section">
            <h3>🏨 Room Preferences</h3>
            <div className="form-group">
              <label>Room Type</label>
              <select
                name="roomPreference"
                value={formData.roomPreference}
                onChange={handleInputChange}
              >
                <option value="standard">Standard Room</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="suite">Suite</option>
                <option value="accessible">Accessible Room</option>
              </select>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="quietRoom"
                  checked={formData.quietRoom}
                  onChange={handleCheckboxChange}
                />
                Prefer Quiet Room
              </label>
              <label>
                <input
                  type="checkbox"
                  name="highFloor"
                  checked={formData.highFloor}
                  onChange={handleCheckboxChange}
                />
                Prefer High Floor
              </label>
              <label>
                <input
                  type="checkbox"
                  name="groundFloor"
                  checked={formData.groundFloor}
                  onChange={handleCheckboxChange}
                />
                Prefer Ground Floor
              </label>
            </div>
          </div>

          {/* Dietary Requirements */}
          <div className="form-section">
            <h3>🍽️ Dietary Requirements</h3>
            <p className="section-help">Select all that apply</p>
            <div className="checkbox-grid">
              {dietaryOptions.map(diet => (
                <label key={diet}>
                  <input
                    type="checkbox"
                    checked={formData.dietaryRequirements.includes(diet)}
                    onChange={() => handleDietaryToggle(diet)}
                  />
                  {diet}
                </label>
              ))}
            </div>
          </div>

          {/* Special Needs & Accessibility */}
          <div className="form-section">
            <h3>♿ Special Needs & Accessibility</h3>
            <p className="section-help">Select if applicable</p>
            
            <div className="checkbox-grid">
              {specialNeedsOptions.map(need => (
                <label key={need}>
                  <input
                    type="checkbox"
                    checked={formData.specialNeeds.includes(need)}
                    onChange={() => handleSpecialNeedsToggle(need)}
                  />
                  {need}
                </label>
              ))}
            </div>

            <div className="checkbox-group" style={{ marginTop: "16px" }}>
              <label>
                <input
                  type="checkbox"
                  name="mobilityAssistance"
                  checked={formData.mobilityAssistance}
                  onChange={handleCheckboxChange}
                />
                Requires Mobility Assistance
              </label>
              <label>
                <input
                  type="checkbox"
                  name="wheelchairAccessible"
                  checked={formData.wheelchairAccessible}
                  onChange={handleCheckboxChange}
                />
                Requires Wheelchair Accessible Room
              </label>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-section">
            <h3>📝 Additional Notes</h3>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any other preferences or special requirements..."
              rows="4"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Save Guest Profile
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestProfileForm;
