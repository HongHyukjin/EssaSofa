import React, { useState, useEffect } from 'react';

function TimerComponent() {
                            
  const [time, setTime] = useState(10800);  // 3600 = 1시간

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    if (hours < 0) hours = 0;
    if (minutes < 0 ) minutes = 0;
    if (seconds < 0) seconds = 0; 

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div id="timer" >
      <div className="timer-box">
        <h1>Time Sale</h1>
        <h2>{formatTime(time)}</h2>
      </div>
    </div>


  );
}

export default TimerComponent;
