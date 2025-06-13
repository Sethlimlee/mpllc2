import React from 'react';
import './Course.css';

const ForeUpCourse = ({ courseName, courseUrl, teeTimes, startDate, numHoles }) => {
  const formatTime = (datetimeStr) => {
    const date = new Date(datetimeStr.replace(' ', 'T'));
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  
  // Function to format the date
  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0); // Set time to midnight to avoid time zone issues
    return localDate.toLocaleDateString('en-CA'); // This returns the date in 'YYYY-MM-DD' format
  };


  // Use the local formatted date
  const formattedDate = formatDate(startDate);



  return (
    <div className="course-container">
      <div className="tee-time-count">
      {teeTimes.length} tee time{teeTimes.length !== 1 ? 's' : ''} available - ( {numHoles} holes )
    </div>
      <div className="tee-times-container">
        {teeTimes.map((teeTime, index) => (
          <a
            key={index}
            href={`${courseUrl}?date=${formattedDate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tee-time-link"
            style={{ '--i': index }}
          >
            {formatTime(teeTime.time)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ForeUpCourse;
