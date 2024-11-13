import React, { useState, useRef, useEffect } from "react";
import './Stopwatch.css'; // Import the CSS file

interface Lap {
  time: number;
  id: number;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [
      ...prevLaps,
      { time, id: prevLaps.length ? prevLaps[prevLaps.length - 1].id + 1 : 1 },
    ]);
  };

  const formatTime = (time: number) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const hours = Math.floor(minutes / 60);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <div className="stopwatch-time">{formatTime(time)}</div>
      <div className="stopwatch-controls">
        {!isRunning ? (
          <button className="stopwatch-button" onClick={startTimer}>
            Start
          </button>
        ) : (
          <button className="stopwatch-button" onClick={stopTimer}>
            Stop
          </button>
        )}
        <button
          className="stopwatch-button"
          onClick={resetTimer}
          disabled={time === 0}
        >
          Reset
        </button>
        <button
          className="stopwatch-button"
          onClick={recordLap}
          disabled={!isRunning}
        >
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div className="stopwatch-laps">
          <h2 className="stopwatch-laps-title">Laps</h2>
          <ul className="stopwatch-laps-list">
            {laps.map((lap) => (
              <li key={lap.id} className="stopwatch-lap-item">
                Lap {lap.id}: {formatTime(lap.time)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;