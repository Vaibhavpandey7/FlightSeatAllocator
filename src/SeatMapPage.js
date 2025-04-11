import React from "react";
import "./ConfirmationPage.css"; // Reusing same styles

const generateSeatLabels = () => {
  const rows = 20;
  const cols = ["A", "B", "C", "D", "E", "F"];
  const seats = [];

  for (let i = 1; i <= rows; i++) {
    cols.forEach((col) => {
      seats.push({ row: i, label: `${i}${col}` });
    });
  }
  return seats;
};

const SeatMapPage = ({ passengerData, travelType }) => {
  const seatLabels = generateSeatLabels();

  const assignedSeats = seatLabels.map((seat, index) => {
    const passenger = passengerData[index];
    if (!passenger) return { ...seat, empty: true };

    return {
      ...seat,
      name: passenger.name,
      travelType: travelType,
      disability: passenger.disability,
    };
  });

  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">🪑 Seat Map 🪑</h2>

      <div className="plane-body">
        <div className="washroom-row"><div className="washroom-seat">🚻</div></div>

        {Array.from({ length: 20 }, (_, rowIdx) => {
          const row = rowIdx + 1;
          const rowSeats = assignedSeats.filter((s) => s.row === row);

          return (
            <React.Fragment key={row}>
              {row === 11 && (
                <div className="exit-row">
                  <div className="exit-label">🚪 EMERGENCY EXIT</div>
                </div>
              )}

              <div className="seat-row">
                <div className="seat-group">
                  {rowSeats.slice(0, 3).map((seat) => (
                    <div
                      key={seat.label}
                      className={`seat-box ${
                        seat.empty
                          ? "empty"
                          : seat.travelType === "family"
                          ? "family"
                          : "solo"
                      }`}
                    >
                      <div className="seat-label">{seat.label}</div>
                      {!seat.empty && (
                        <>
                          <div className="passenger-name">{seat.name}</div>
                          {seat.disability === "Yes" && (
                            <div className="disability-symbol">*</div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="aisle" />

                <div className="seat-group">
                  {rowSeats.slice(3).map((seat) => (
                    <div
                      key={seat.label}
                      className={`seat-box ${
                        seat.empty
                          ? "empty"
                          : seat.travelType === "family"
                          ? "family"
                          : "solo"
                      }`}
                    >
                      <div className="seat-label">{seat.label}</div>
                      {!seat.empty && (
                        <>
                          <div className="passenger-name">{seat.name}</div>
                          {seat.disability === "Yes" && (
                            <div className="disability-symbol">*</div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div className="washroom-row"><div className="washroom-seat">🚻</div></div>
      </div>
    </div>
  );
};

export default SeatMapPage;
