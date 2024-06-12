import React from 'react';

const Timer = ({ time }) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatTime = (unit) => unit.toString().padStart(2, '0');

  return (
    <div>
      <h1>
        Timer: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </h1>
    </div>
  );
};

export default Timer;