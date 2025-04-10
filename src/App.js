import React, { useState } from "react";
import "./App.css";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import ConfirmationPage from "./ConfirmationPage";

const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"];

const App = () => {
  const [step, setStep] = useState(1);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [selectedFlight, setSelectedFlight] = useState("");
  const [travelType, setTravelType] = useState("");
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "", disability: "" }]);

  const flightOptions = [
    { id: "AI101", name: "Air India 101", time: "05:00 AM" },
    { id: "6E202", name: "IndiGo 202", time: "10:30 AM" },
    { id: "SG303", name: "SpiceJet 303", time: "03:45 PM" },
    { id: "SG454", name: "Vistara 302", time: "06:00 PM" },
    { id: "QW303", name: "Air Express 48", time: "11:30 PM" },
    { id: "CIU496", name: "Air Asia", time: "02:00 AM" }
  ];

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "", disability: "" }]);
  };

  const handleSubmit = async () => {
    const bookingData = {
      fromCity,
      toCity,
      selectedFlight,
      travelType,
      passengers,
      timestamp: Timestamp.now()
    };

    try {
      await addDoc(collection(db, "passengerData"), bookingData);
      alert("Passenger details saved successfully!");
      setStep(4);
    } catch (error) {
      console.error("Error saving passenger data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <>
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/sky-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="app-container">
        <h1 className="main-title">Flight Seat Allocating System</h1>
        <p className="subtitle">Plan your journey with smart seat allocation & dynamic pricing</p>

        {step === 1 && (
          <div className="location-section">
            <h2 className="section-title">Where are you headed?</h2>
            <div className="form-group">
              <label className="label">Departure City</label>
              <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="input compact-select">
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="label">Destination City</label>
              <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="input compact-select">
                <option value="">Select City</option>
                {cities.filter(city => city !== fromCity).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <button onClick={() => setStep(2)} disabled={!fromCity || !toCity} className="button">Find Flights</button>
          </div>
        )}

        {step === 2 && (
          <div className="flight-selection">
            <h2 className="section-title">Step 2: Select a Flight</h2>

            <div className="flight-cards-container">
              {flightOptions.map((flight) => (
                <label key={flight.id} className={`flight-card ${selectedFlight === flight.id ? "selected" : ""}`}>
                  <input type="radio" name="flight" value={flight.id} onChange={() => setSelectedFlight(flight.id)} />
                  <div className="flight-info">
                    <strong>{flight.name}</strong>
                    <span>{flight.time}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="travel-type-container">
              <p className="travel-question">Are you traveling?</p>
              <label>
                <input type="radio" name="travelType" value="solo" onChange={() => {
                  setTravelType("solo");
                  setPassengers([{ name: "", age: "", gender: "", disability: "" }]);
                }} /> Solo
              </label>
              <label>
                <input type="radio" name="travelType" value="family" onChange={() => {
                  setTravelType("family");
                  setPassengers([
                    { name: "", age: "", gender: "", disability: "" },
                    { name: "", age: "", gender: "", disability: "" }
                  ]);
                }} /> With Family
              </label>

              <button onClick={() => setStep(3)} disabled={!selectedFlight || !travelType} className="button">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="passenger-form">
            <h2 className="section-title">Enter Passenger Details</h2>
            {passengers.map((p, index) => (
              <div key={index} className="passenger-block horizontal-fields">
                <input type="text" placeholder="Name" value={p.name} onChange={(e) => handlePassengerChange(index, "name", e.target.value)} />
                <input type="number" placeholder="Age" value={p.age} onChange={(e) => handlePassengerChange(index, "age", e.target.value)} />
                <select value={p.gender} onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select value={p.disability} onChange={(e) => handlePassengerChange(index, "disability", e.target.value)}>
                  <option value="">Disability?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}

            <div className="button-group">
              {travelType === "family" && (
                <button onClick={addPassenger} className="add-button">Add Passenger</button>
              )}
              <button onClick={handleSubmit} className="button">Submit</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <ConfirmationPage
          passengerData={passengers}
          flightData={{
            departure: fromCity,
            destination: toCity,
            name: flightOptions.find(f => f.id === selectedFlight)?.name,
            travelType: travelType // 👈 add this line
          }}
        />
        )}
      </div>
    </>
  );
};

export default App;
