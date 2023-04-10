import { CSSProperties } from 'react';

type LoadingAnimationType = 'spinner' | 'progress_bar' | 'circular_progress';

export type LightBoxModel = {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
  fallbackURL?: string;
  style?: CSSProperties;
  showSpinner?: boolean;
  loadingAnimationType?: LoadingAnimationType;
};
