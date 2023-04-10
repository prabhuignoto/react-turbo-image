import cls from 'classnames';
import React from 'react';
import styles from './bar-progress.module.scss';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const containerStyles = cls(styles.progress, styles.container);
  const fillerStyles = cls(styles.progress, styles.filler);
  // const labelStyles = styles.label;

  return (
    <div className={styles.progressBar}>
      <div className={containerStyles}>
        <div className={fillerStyles} style={{ width: `${percentage}%` }}>
          {/* <span className={labelStyles}>{`${percentage}%`}</span> */}
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
