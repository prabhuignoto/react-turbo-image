import cls from 'classnames';
import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useImageProgress } from '../effects/useImageDownload';
import { cssPropertiesToString } from '../utils';
import { AnimationSelector } from './animation-selector';
import { LightBoxModel } from './light-box.model';
import styles from './light-box.module.scss';

const LightBox: FunctionComponent<LightBoxModel> = ({
  src,
  height = 200,
  width = 200,
  fallbackURL,
  style,
  showSpinner = true,
  loadingAnimationType = 'spinner',
}) => {
  const { init, loadingImage, progress } = useImageProgress(src, fallbackURL);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const wrapperStyle = useMemo(() => {
    return {
      height: `${height}px`,
      width: `${width}px`,
    };
  }, [height, width]);

  const onRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      nodeRef.current = node;
    }
  }, []);

  useEffect(() => {
    const node = nodeRef.current as HTMLDivElement;

    const exec = async (node: HTMLDivElement) => {
      await init(node);
    };

    if (node) {
      exec(node)
        .then(() => {
          console.log('image loaded');
        })
        .catch((err) => {
          console.log('image load error', err);
        });
    }
  }, [nodeRef.current]);

  useEffect(() => {
    const node = nodeRef.current as HTMLDivElement;
    const firstChild = node.firstChild as HTMLImageElement;

    if (firstChild) {
      firstChild.style.cssText += cssPropertiesToString(style);
    }
  }, [style]);

  const canShowSpinner = useMemo(() => {
    return showSpinner && loadingImage;
  }, [showSpinner, loadingImage]);

  const lightBoxClass = useMemo(() => {
    return loadingImage ? cls(styles.wrapper, styles.loading) : cls(styles.wrapper, styles.loaded);
  }, [loadingImage]);

  const spinWrapperClass = useMemo(() => {
    return cls({
      [styles.spin_wrapper]: true,
      [styles.show]: canShowSpinner,
      [styles.hide]: !loadingImage,
    });
  }, [loadingImage]);

  const imageContainerClass = useMemo(() => {
    return cls({
      [styles.image_container]: true,
      [styles.loading]: loadingImage,
    });
  }, [loadingImage]);

  return (
    <div className={lightBoxClass} style={wrapperStyle}>
      <div ref={onRef} className={imageContainerClass}></div>
      <div className={spinWrapperClass}>
        <AnimationSelector loadingAnimationType={loadingAnimationType} percentage={progress} />
      </div>
    </div>
  );
};

export default LightBox;
