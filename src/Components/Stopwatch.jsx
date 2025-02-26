import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = String((time % 1000) / 10).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">React Stopwatch</h1>
      <div className="card p-4 shadow col-md-6 mx-auto">
        <div className="display-4 font-monospace">{formatTime(time)}</div>
        <div className="mt-3">
          {!isActive && !isPaused ? (
            <button onClick={handleStart} className="btn btn-success me-2">Start</button>
          ) : isPaused ? (
            <button onClick={() => setIsPaused(false)} className="btn btn-primary me-2">Resume</button>
          ) : (
            <button onClick={handlePause} className="btn btn-warning me-2">Pause</button>
          )}
          <button onClick={handleReset} className="btn btn-danger">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
