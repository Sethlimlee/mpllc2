import React from 'react';
import './Course.css';

const MemberSportsCourse = ({ courseName, teeTimes, selectedDate, golfClubId, id, numHoles }) => {
  const formatTeeTime = (minutesAfterMidnight) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMinutes(minutesAfterMidnight);

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Denver',
    });
  };

  const getMinutesAfterMidnightForDate = (date) => {
    const selectedDateObj = new Date(date);
    selectedDateObj.setHours(0, 0, 0, 0);
    return (selectedDateObj.getTime() - selectedDateObj.setHours(0, 0, 0, 0)) / 60000;
  };

  const currentMinutes = getMinutesAfterMidnightForDate(selectedDate);

  return (
    <div className="course-container">
      <div className="tee-time-count">
      {teeTimes.length} tee time{teeTimes.length !== 1 ? 's' : ''} available - ( {numHoles} holes )
    </div>
      <div className="tee-times-container">
      {teeTimes.map((item, index) => {
  if (item.teeTime < currentMinutes) return null;

  const time = formatTeeTime(item.teeTime);
  const bookingUrl = `https://app.membersports.com/tee-times/${golfClubId}/${id}/0`;

  return (
    <a
      key={index}
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="tee-time-link"
      style={{ '--i': index }}
    >
      {time}
    </a>
  );
})}

      </div>
    </div>
  );
};


export default MemberSportsCourse;
