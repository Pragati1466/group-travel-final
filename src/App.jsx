import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import HotelDetails from "./pages/HotelDetails";
import GroupDashboard from "./pages/GroupDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/group-dashboard" element={<GroupDashboard />} />
    </Routes>
  );
}




export default App;