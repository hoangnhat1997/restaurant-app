import React, { useState } from "react";

const ReservationsPage = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">내 예약</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      {selectedDate && (
        <p className="mt-4">You have selected: {selectedDate}</p>
      )}
    </div>
  );
};

export default ReservationsPage;
