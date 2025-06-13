import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

import ChronoCourse from './ChronoCourse';
import ForeUpCourse from './ForeUpCourse';
import MemberSportsCourse from './MemberSportsCourse';

// xavier
// Seth was here


function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [chronoTeeTimes, setChronoTeeTimes] = useState([]);
  const [foreupTeeTimes, setForeupTeeTimes] = useState([]);
  const [memberSportsTeeTimes, setMemberSportsTeeTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noAvailableTeeTimes, setNoAvailableTeeTimes] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [holesExpanded, setHolesExpanded] = useState(true);
  const [numHoles, setNumHoles] = useState(9);

  // Define Chrono courses (Chronogolf)
  const chronoCourses = useMemo(() => [
    { id: 'bc27ab7a-6218-4b61-9aa8-0838f7c44ce3%2Ccaa8142a-4a42-482b-8d35-4239ce26f7b0', name: 'Bonneville', url: 'https://www.chronogolf.com/club/bonneville-golf-course', holesSupported: [9, 18] },
    { id: '41ea25ca-ffcb-4f14-a86d-de0ef84510e0', name: 'Forest Dale', url: 'https://www.chronogolf.com/club/forest-dale-golf-course', holesSupported: [9, 18] },
    { id: '547936f8-0f45-4bea-b557-d15a4de485ad', name: 'Glendale', url: 'https://www.chronogolf.com/club/glendale-golf-course', holesSupported: [9, 18] },
    { id: '2c99f9f7-e373-47d5-8b16-dd15f332fe57', name: 'Mick Riley Regulation', url: 'https://www.chronogolf.com/club/mick-riley-slco', holesSupported: [9] },
    { id: 'b6cf292e-8323-426d-828e-f3e55a112b8f', name: 'Mick Riley Par 3', url: 'https://www.chronogolf.com/club/mick-riley-slco', holesSupported: [9] },
    { id: 'bd12a75f-50ad-4ca8-8d18-520e40b22551%2C591296f8-efa2-4f8d-a746-4b5d91a8f38a%2C3b6d3bcf-4af4-4deb-a715-acce88244790', name: 'Mountain View', url: 'https://www.chronogolf.com/club/mountain-view-slco', holesSupported: [9, 18] },
    { id: '997cd01f-4ce8-4462-a459-594762efb606', name: 'Nibley', url: 'https://www.chronogolf.com/club/nibley-park-golf-course', holesSupported: [9] },
    { id: '51eb43b1-d054-46e6-9dc6-dba30a6f9906%2Cdd49962c-d6a9-4150-a701-9e547902e664', name: 'Old Mill', url: 'https://www.chronogolf.com/club/old-mill-slco', holesSupported: [9, 18] },
    { id: '79c03256-be52-4e3d-aba8-9c64df6e12b2', name: 'River Oaks', url: 'https://www.chronogolf.com/club/river-oaks-golf-course-utah', holesSupported: [9, 18] },
    { id: '9bb16c41-88fe-4f36-a84c-39f74f8aa5f2%2Cbc4c00f2-435a-4f4a-8d0a-c807d5f515f0', name: 'South Mountain', url: 'https://www.chronogolf.com/club/south-mountain-slco', holesSupported: [9, 18] },
    { id: '2c162b65-6803-4bad-9a21-4c1ca88bb242%2C77dca1a2-edae-47d2-a202-a1e9391cc305%2Cbd6e3c42-7ae5-4d97-b6d0-60ebf9957a7e', name: 'Mountain Dell', url: 'https://www.chronogolf.com/club/mountain-dell-golf-club', holesSupported: [9, 18] }
  ],[]);

  // Define ForeUp courses
  const foreupCourses = useMemo(() => [
    { id: '1726', bookingClass: '3412', name: 'Sleepy Ridge', url: 'https://foreupsoftware.com/index.php/booking/19396/1726#/teetimes', holesSupported: [9, 18] }
  ],[]);

   // Define Membersports courses
  const memberSportsCourses = useMemo(() => [
    { name: 'Fox Hollow', url: 'https://app.membersports.com/tee-times/15396/18907/0', id: 18907, golfClubId: 15396, holesSupported: [9, 18] },
    { name: 'Hobble Creek', url: 'https://app.membersports.com/tee-times/15404/18918/0', id: 18918, golfClubId: 15404, holesSupported: [9, 18] },
    { name: 'Cedar Hills', url: 'https://app.membersports.com/tee-times/15381/18891/0', id: 18891, golfClubId: 15381, holesSupported: [9, 18] },
    { name: 'Talons Cove', url: 'https://app.membersports.com/tee-times/15455/18982/0', id: 18982, golfClubId: 15455, holesSupported: [9, 18] }
  ],[]);

  const allCourses = useMemo(() => (
  [...chronoCourses, ...foreupCourses, ...memberSportsCourses].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
), [chronoCourses, foreupCourses, memberSportsCourses]);


  // Selected course names (default to all selected)
  // const [selectedCourses, setSelectedCourses] = useState(() => new Set(allCourses.map(c => c.name)));

   // Selected course names (default to none selected)
   const [selectedCourses, setSelectedCourses] = useState(() => new Set());

  const handleCheckboxChange = (name) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  // Track expanded courses
  const [expandedCourses, setExpandedCourses] = useState(() => new Set(allCourses.map(c => c.name)));

  const toggleFilters = () => {
    setFiltersExpanded(prev => !prev);
  };
  const toggleHoles = () => {
    setHolesExpanded(prev => !prev);
  };

  const toggleCourse = (name) => {
    setExpandedCourses(prev => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  useEffect(() => {
    const fetchTeeTimes = async () => {
      setLoading(true);
      let hasTeeTimes = false;

      // Format the Chrono date in local time (YYYY-MM-DD)
      const chronoDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
      // Format the ForeUp date (MM-DD-YYYY)
      const foreupDate = `${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}`;

      const filteredChronoCourses = chronoCourses.filter(course =>
        selectedCourses.has(course.name) && course.holesSupported.includes(numHoles)
      );

      const filteredForeupCourses = foreupCourses.filter(course =>
        selectedCourses.has(course.name) && course.holesSupported.includes(numHoles)
      );

      const filteredMemberCourses = memberSportsCourses.filter(course =>
        selectedCourses.has(course.name) && course.holesSupported.includes(numHoles)
      );

      try {
        const chronoResults = await Promise.all(
          filteredChronoCourses.map(async (course) => {
            const baseUrl = `/.netlify/functions/chrono?url=${encodeURIComponent(
                `https://www.chronogolf.com/marketplace/v2/teetimes?start_date=${chronoDate}&free_slots=4&course_ids=${course.id}&holes=${numHoles}&page=`
              )}`;

            
            // netlify url //
            // const baseUrl = `/.netlify/functions/chrono?url=${encodeURIComponent(
            //   `https://www.chronogolf.com/marketplace/v2/teetimes?start_date=${chronoDate}&free_slots=4&course_ids=${course.id}&holes=${numHoles}&page=`
            // )}`;
            
            //local url//
            // const baseUrl = `marketplace/v2/teetimes?start_date=${chronoDate}&free_slots=4&course_ids=${course.id}&holes=${numHoles}&page=`



            const maxPages = 3;
            let pagePromises = [];

            // Start all requests concurrently for each page
            for (let page = 1; page <= maxPages; page++) {
              pagePromises.push(
                fetch(`${baseUrl}${page}`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.teetimes && data.teetimes.length > 0) {
                      return data.teetimes; // return the tee times from this page
                    } else {
                      return []; // return an empty array if no data
                    }
                  })
                  .catch((error) => {
                    console.error(`Error fetching page ${page} for course ${course.name}:`, error);
                    return []; // return an empty array on error
                  })
              );
            }

            // Wait for all page fetches to complete
            const allPagesData = await Promise.all(pagePromises);
            const allTees = allPagesData.flat(); // Flatten the arrays from all pages into a single array

            if (allTees.length > 0) hasTeeTimes = true;

            return { courseName: course.name, courseUrl: course.url, teeTimes: allTees };
          })
        );

        setChronoTeeTimes(chronoResults);

        const foreupResults = await Promise.all(
          filteredForeupCourses.map(async (course) => {
            const baseUrl = `/.netlify/functions/foreup?url=${encodeURIComponent(`https://www.foreupsoftware.com/api/booking/times?time=all&date=${foreupDate}&holes=${numHoles}&players=4&booking_class=${course.bookingClass}&schedule_id=${course.id}&schedule_ids%5B%5D=${course.id}&specials_only=0&api_key=no_limits`)}`;
            
            // netlify url //
            // const baseUrl = `/.netlify/functions/foreup?url=${encodeURIComponent(`https://www.foreupsoftware.com/api/booking/times?time=all&date=${foreupDate}&holes=${numHoles}&players=4&booking_class=${course.bookingClass}&schedule_id=${course.id}&schedule_ids%5B%5D=${course.id}&specials_only=0&api_key=no_limits`)}`;
            
            // local url //
            // const baseUrl = `api/booking/times?time=all&date=${foreupDate}&holes=${numHoles}&players=4&booking_class=${course.bookingClass}&schedule_id=${course.id}&schedule_ids%5B%5D=788&specials_only=0&api_key=no_limits`;
            
            const res = await fetch(`${baseUrl}`);
            const data = await res.json();

            if (data.length > 0) hasTeeTimes = true;

            return { courseName: course.name, courseUrl: course.url, teeTimes: data };
          })
        );
        setForeupTeeTimes(foreupResults);

        const memberResults = await Promise.all(
          filteredMemberCourses.map(async (course) => {
            const payload = {
              configurationTypeId: 0,
              date: chronoDate,
              golfClubGroupId: 0,
              golfClubId: course.golfClubId,
              golfCourseId: course.id,
              groupSheetTypeId: 0
            };
            const apiKey = process.env.REACT_APP_MEMBERSPORTS_API_KEY;
            const response = await fetch('https://api.membersports.com/api/v1/golfclubs/onlineBookingTeeTimes', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'content-type': 'application/json; charset=UTF-8',
                'x-api-key': apiKey
              },
              body: JSON.stringify(payload)
            });

            const data = await response.json();

            const getCurrentMinutesInDenver = () => {
              const now = new Date();
              const utc = now.getTime() + now.getTimezoneOffset() * 60000;
              const denverOffset = -6 * 60; // Adjust for daylight savings if needed
              const denverTime = new Date(utc + denverOffset * 60000);
              return denverTime.getHours() * 60 + denverTime.getMinutes();
            };
            
            const currentMinutes = getCurrentMinutesInDenver();
            
            // Check if selected date is today
            const isToday = (() => {
              const today = new Date();
              return (
                startDate.getDate() === today.getDate() &&
                startDate.getMonth() === today.getMonth() &&
                startDate.getFullYear() === today.getFullYear()
              );
            })();
            
            // Filter MemberSports tee times
            const validTeeTimes = data.flatMap((tee) =>
              tee.items
                .filter((item) => {
                  const isAfterNow = !isToday || tee.teeTime >= currentMinutes + 30;
            
                  const matches =
                    item.playerCount === 0 &&
                    (
                      (numHoles === 18 && (item.holesRequirementTypeId === 0 || item.holesRequirementTypeId === 2)) ||
                      (numHoles === 9 && (item.holesRequirementTypeId === 0 || item.holesRequirementTypeId === 1))
                    );       
                  return matches && isAfterNow;
                })
                .map((item) => ({
                  ...item,
                  teeTime: tee.teeTime, // attach teeTime info from parent
                }))
            );
            
            
            
            
            
            
            
            if (validTeeTimes.length > 0) {
              hasTeeTimes = true;
            }
            return { courseName: course.name, courseUrl: course.url, teeTimes: validTeeTimes,  };
            
          })
        );
        setMemberSportsTeeTimes(memberResults);
        setNoAvailableTeeTimes(!hasTeeTimes);
      } catch (err) {
        console.error("Error fetching tee times:", err);
        setNoAvailableTeeTimes(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeeTimes();
  }, [startDate, selectedCourses, numHoles, chronoCourses, foreupCourses, memberSportsCourses]);

  return (
    <div>
      <div className="header">
        <h1 className="title-green">MPLLC.GOLF</h1>
        Select a Date to View Tee Times
  
        {/* Wrap DatePicker with a container for margin */}
        <div className="datepicker-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="custom-datepicker"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 9))}
            onFocus={(e) => e.target.blur()}
          />
        </div>
  
        {/* Course Filters */}
        <div className='filter-section'>
        <div
          className="filter-header"
          onClick={toggleFilters}
          role="button"
          aria-expanded={filtersExpanded}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleFilters();
          }}
        >
          Filter by Course
          <span className="filter-chevron">{filtersExpanded ? '−' : '+'}</span>
        </div>
        </div>
  
        {filtersExpanded && (
          <div className="course-filters">
            <div className="course-filters-courses">
              {allCourses.map((course) => (
                <div
                  key={course.name}
                  className={`filter-pill ${selectedCourses.has(course.name) ? 'active' : ''}`}
                  onClick={() => handleCheckboxChange(course.name)}
                >
                  {course.name}
                </div>
              ))}
            </div>
  
            <div className="select-all">
              <div
                className={`select-all-pill ${selectedCourses.size === allCourses.length ? 'active' : ''}`}
                onClick={() => setSelectedCourses(new Set(allCourses.map((c) => c.name)))}
              >
                Select All
              </div>
  
              <div
                className={`select-all-pill ${selectedCourses.size === 0 ? 'active' : ''}`}
                onClick={() => setSelectedCourses(new Set())}
              >
                Unselect All
              </div>
            </div>
          </div>
        )}
  
        {/* Holes Filter */}
        <div className='filter-section'>
        <div
          className="holes-header"
          onClick={toggleHoles}
          role="button"
          aria-expanded={holesExpanded}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleHoles();
          }}
        >
          Number of Holes:
          <span className="holes-chevron">{holesExpanded ? '−' : '+'}</span>
        </div>
        </div>
  
        {holesExpanded && (
          <div className="holes">
            <div
              className={`holes-pill ${numHoles === 9 ? 'active' : ''}`}
              onClick={() => setNumHoles(9)}
            >
              9 Holes
            </div>
            <div
              className={`holes-pill ${numHoles === 18 ? 'active' : ''}`}
              onClick={() => setNumHoles(18)}
            >
              18 Holes
            </div>
          </div>
        )}
      </div>

       {/* Add the note about search parameters */}
<div className="search-note">
    <p><strong>Note:</strong> Currently, the app only searches for Tee Times with 4 players available.</p>
    <p><strong>Note:</strong> Courses vary on how far in advanced results will show.</p>
  </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="courses">
          {noAvailableTeeTimes && (
            <p className="no-tee-times-message">No tee times available for this date across all selected courses.</p>
          )}

          {chronoTeeTimes.map((courseData, index) => {
            if (!courseData.teeTimes || courseData.teeTimes.length === 0) return null;
            const isExpanded = expandedCourses.has(courseData.courseName);
            return (
              <div key={`chrono-${index}`} className="course-wrapper">
                <div
                  className="course-header"
                  onClick={() => toggleCourse(courseData.courseName)}
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleCourse(courseData.courseName);
                  }}
                >
                  {courseData.courseName}
                  <span className="chevron">{isExpanded ? '−' : '+'}</span>
                </div>

                {isExpanded && (
                  <ChronoCourse
                  teeTimes={courseData.teeTimes}
                  courseUrl={courseData.courseUrl}
                  startDate={startDate}
                  numHoles={numHoles}
                />
                )}
              </div>
            );
          })}

          {foreupTeeTimes.map((courseData, index) => {
            if (!courseData.teeTimes || courseData.teeTimes.length === 0) return null;
            const isExpanded = expandedCourses.has(courseData.courseName);
            return (
              <div key={`foreup-${index}`} className="course-wrapper">
                <div
                  className="course-header"
                  onClick={() => toggleCourse(courseData.courseName)}
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleCourse(courseData.courseName);
                  }}
                >
                  {courseData.courseName}
                  <span className="chevron">{isExpanded ? '−' : '+'}</span>
                </div>

                {isExpanded && (
                  <ForeUpCourse
                    teeTimes={courseData.teeTimes}
                    courseUrl={courseData.courseUrl}
                    numHoles={numHoles}
                  />
                )}
              </div>
            );
          })}

{memberSportsTeeTimes.map((courseData, index) => {
  if (!courseData.teeTimes || courseData.teeTimes.length === 0) return null;
  const isExpanded = expandedCourses.has(courseData.courseName);
  return (
    <div key={`membersports-${index}`} className="course-wrapper">
      <div
        className="course-header"
        onClick={() => toggleCourse(courseData.courseName)}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleCourse(courseData.courseName);
        }}
      >
        {courseData.courseName}
        <span className="chevron">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <MemberSportsCourse
          teeTimes={courseData.teeTimes}
          courseName={courseData.courseName}
          selectedDate={startDate}
          golfClubId={memberSportsCourses.find(c => c.name === courseData.courseName)?.golfClubId}
          id={memberSportsCourses.find(c => c.name === courseData.courseName)?.id}
          numHoles={numHoles}
        />
      )}
    </div>
  );
})}

        </div>
      )}
    </div>
  );
}

export default App;
