import React from 'react';
import styles from './circular-progress.module.scss';

interface CircularProgressBarProps {
  progress: number; // a number between 0 and 100
  size?: number; // optional size of the component (in pixels)
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, size = 60 }) => {
  const radius = size / 2 - 4; // subtracting 4 to account for border width
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle className={styles.circleBackground} cx={size / 2} cy={size / 2} r={radius} />
      <circle
        className={styles.circleProgress}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
      {/* <text className={styles.progressText} x="50%" y="50%">
        {`${progress}%`}
      </text> */}
    </svg>
  );
};

export { CircularProgressBar };
