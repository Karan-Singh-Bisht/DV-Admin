import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaUser,
  FaRegCommentDots,
  FaMapPin,
} from "react-icons/fa";
import L from "leaflet";
import "./poppins.css";

// Dummy fallback data
const dummyHeatmapUsers = [
  {
    id: "1",
    username: "rahulverma",
    location: { lat: 17.385044, lng: 78.486671 },
    story: "Chilling at Charminar! 😎",
  },
  {
    id: "2",
    username: "aanchalmehta",
    location: { lat: 28.613939, lng: 77.209023 },
    story: "Connaught Place coffee break ☕",
  },
];

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // optional custom pin icon
  iconSize: [25, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40],
});

const PopPins = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newPin, setNewPin] = useState(null);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await axios.get(
          "https://your-api-url.com/api/userstories"
        );
        setUsers(response.data);
      } catch (err) {
        console.warn("API failed, loading dummy data.");
        setUsers(dummyHeatmapUsers);
        setError("Failed to fetch data, using fallback.");
      }
    };
    fetchUserStories();
  }, []);

  const handlePinDrop = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setNewPin({ lat, lng });
    alert(`Pinned location at: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  const handleAddPin = () => {
    // Drop pin at center India
    setNewPin({ lat: 22.9734, lng: 78.6569 });
  };

  return (
    <div className="poppins-container">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> Snapchat-style Heatmap &
          User Stories
        </h2>
        <button
          onClick={handleAddPin}
          className="bg-gray-400 w-60 h-10 flex items-center justify-center px-3 py-3 hover:bg-gray-500 text-white rounded"
        >
          <FaMapPin className="mr-2" /> Drop New Pin
        </button>
      </div>

      {error && <div className="error-message text-red-500 mb-4">{error}</div>}

      {/* Map Section */}
      <div className="map-section mb-8">
        <MapContainer
          center={[22.9734, 78.6569]}
          zoom={5}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          {users.map((user) => (
            <Marker
              key={user.id}
              position={[user.location.lat, user.location.lng]}
              icon={customIcon}
            >
              <Popup>
                <p className="font-semibold flex items-center gap-1">
                  <FaUser /> {user.username}
                </p>
                <p className="text-sm flex items-center gap-1">
                  <FaRegCommentDots /> {user.story}
                </p>
              </Popup>
            </Marker>
          ))}

          {/* Draggable New Pin */}
          {newPin && (
            <Marker
              position={[newPin.lat, newPin.lng]}
              draggable={true}
              icon={customIcon}
              eventHandlers={{
                dragend: handlePinDrop,
              }}
            >
              <Popup>You can drag me!</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaUser className="text-blue-500" /> User Info & Stories
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Story</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center hover:bg-gray-50">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  {user.location.lat}, {user.location.lng}
                </td>
                <td className="border px-4 py-2">{user.story}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopPins;
