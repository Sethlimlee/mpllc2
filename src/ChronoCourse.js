import React from 'react';
import './Course.css';

const ChronoCourse = ({ courseName, courseUrl, teeTimes, startDate, numHoles }) => {

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date(startDate);
    date.setHours(hour, minute, 0, 0);

    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Denver',
    }).format(date);
  };

  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    return localDate.toLocaleDateString('en-CA');
  };

  const formattedDate = formatDate(startDate);

  // Filter the tee times based on numHoles
  const filteredTeeTimes = teeTimes.filter(teeTime => {
    if (numHoles === 18) {
      // Only include tee times with course.holes === 18 when numHoles is 18
      return teeTime.course.holes === 18;
    }
    // If numHoles is 9, don't change the filtering logic
    return true;
  });

  return (
    <div className="course-container">
      {/* Display the number of tee times */}
      <div className="tee-time-count">
        {filteredTeeTimes.length} tee time{filteredTeeTimes.length !== 1 ? 's' : ''} available - ( {numHoles} holes )
      </div>

      <div className="tee-times-container">
        {filteredTeeTimes.map((teeTime, index) => (
          <a
            key={index}
            href={`${courseUrl}?date=${formattedDate}&step=options&teetime=${teeTime.uuid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tee-time-link"
            style={{ '--i': index }}
          >
            {formatTime(teeTime.start_time)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChronoCourse;
