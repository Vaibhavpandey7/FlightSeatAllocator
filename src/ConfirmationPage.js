import React from "react";
import "./ConfirmationPage.css";

const ConfirmationPage = ({ passengerData, flightData, onShowSeatMap }) => {
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">🎉 Booking Confirmed! 🎉</h2>
      <p><strong>Flight:</strong> {flightData.name}</p>
      <p><strong>From:</strong> {flightData.departure}</p>
      <p><strong>To:</strong> {flightData.destination}</p>

      <h3>Passenger Details:</h3>
      <ul>
        {passengerData.map((p, index) => (
          <li key={index} className="passenger-info">
            {p.name} (Age: {p.age}, Gender: {p.gender}, Disability: {p.disability})
          </li>
        ))}
      </ul>

      <button onClick={onShowSeatMap} className="button" style={{ marginTop: "30px" }}>
        View Seat Map
      </button>
    </div>
  );
};

export default ConfirmationPage;
