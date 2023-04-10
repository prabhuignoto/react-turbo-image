import { FunctionComponent } from 'react';
import { ProgressBar } from '../animations/bar-progress';
import { CircularProgressBar } from '../animations/circular-progress';
import { Spinner } from '../animations/spinner';

type LoadingAnimationType = 'progress_bar' | 'spinner' | 'circular_progress';

interface LoadingProps {
  loadingAnimationType: LoadingAnimationType;
  percentage: number;
}

const AnimationSelector: FunctionComponent<LoadingProps> = ({
  loadingAnimationType,
  percentage,
}) => {
  switch (loadingAnimationType) {
    case 'progress_bar':
      return <ProgressBar percentage={percentage ?? 0} />;
    case 'spinner':
      return <Spinner />;
    case 'circular_progress':
      return <CircularProgressBar progress={percentage} />;
    default:
      return null;
  }
};

export { AnimationSelector };
