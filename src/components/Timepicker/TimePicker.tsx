
"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const generateTimeIntervals = () => {
  const intervals = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      intervals.push(time);
    }
  }
  return intervals;
};

 const TimePicker = ({ occupiedTimes }) => {
  const intervals = generateTimeIntervals();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [customOccupiedSlots, setCustomOccupiedSlots] = useState([]);

  useEffect(() => {
    // Calculate custom occupied slots when occupiedTimes prop changes
    if (occupiedTimes && occupiedTimes.length > 0) {
      const calculatedOccupiedSlots = calculateOccupiedSlots(occupiedTimes);
      setCustomOccupiedSlots(calculatedOccupiedSlots);
    }
  }, [occupiedTimes]);

  const handleTimeClick = (time) => {
    if (!startTime || (startTime && endTime)) {
      setStartTime(time);
      setEndTime(null);
      setHoveredTime(null);
    } else if (startTime && !endTime) {
      if (time >= startTime) {
        setEndTime(time);
      } else {
        setStartTime(time);
      }
      setHoveredTime(null);
    }
  };

  const handleTimeMouseEnter = (time) => {
    if (startTime && !endTime) {
      setHoveredTime(time);
    }
  };

  const handleTimeMouseLeave = () => {
    setHoveredTime(null);
  };

  const isHighlighted = (time) => {
    if (startTime && endTime) {
      return time >= startTime && time <= endTime;
    }
    return false;
  };

  const isFaded = (time) => {
    if (startTime && !endTime && hoveredTime) {
      return time >= startTime && time <= hoveredTime;
    }
    return false;
  };

  const isMixed = (time) => {
    if (customOccupiedSlots.length > 0 && (startTime && endTime)) {
      return time >= startTime && time <= endTime && customOccupiedSlots.includes(time);
    }
    return false;
  };

  const submitInfo = () => {
    const duration = calculateDuration();
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Duration:", duration, "minutes");
  };

  const calculateOccupiedSlots = (occupiedTimes) => {
    const slots = [];
    occupiedTimes.forEach(({ startTime, endTime }) => {
      const startHour = parseInt(startTime.split(':')[0]);
      const startMinute = parseInt(startTime.split(':')[1]);
      const endHour = parseInt(endTime.split(':')[0]);
      const endMinute = parseInt(endTime.split(':')[1]);
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          if ((hour === startHour && minute >= startMinute) || (hour > startHour && hour < endHour) || (hour === endHour && minute <= endMinute)) {
            slots.push(time);
          }
        }
      }
    });
    return slots;
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const duration = (end - start) / (1000 * 60); // Duration in minutes
      return duration;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {intervals.map((time) => (
        <div
          key={time}
          className={`flex items-center justify-center p-2 border cursor-pointer select-none
            ${isMixed(time) ? 'bg-purple-300' : (time === startTime || time === endTime || isHighlighted(time)) ? 'bg-green-500' : isFaded(time) ? 'bg-green-300' : (customOccupiedSlots.includes(time)) ? 'bg-red-300' : '' }
            hover:bg-green-500`}
          onClick={() => handleTimeClick(time)}
          onMouseEnter={() => handleTimeMouseEnter(time)}
          onMouseLeave={handleTimeMouseLeave}
        >
          {time}
        </div>
      ))}

      <Button onClick={submitInfo}>Submit</Button>
    </div>
  );
};

export default TimePicker;