import classNames from 'classnames';
import styles from './spinner.module.scss';

const Spinner = () => {
  const spinnerArms = Array.from({ length: 8 }).map((_, index) => {
    const armClasses = classNames(styles.spinnerArm, styles[`spinnerArm${index + 1}`]);

    return <div key={index} className={armClasses} />;
  });

  return <div className={styles.spinnerArms}>{spinnerArms}</div>;
};

export { Spinner };
