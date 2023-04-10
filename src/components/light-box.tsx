import cls from 'classnames';
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const { init, imageLoading, imageLoaded, progress } = useImageProgress(src, fallbackURL);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [canInit, setCanInit] = useState(false);

  const wrapperStyle = useMemo(() => {
    return {
      height: `${height}px`,
      width: `${width}px`,
    };
  }, [height, width]);

  const onRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      nodeRef.current = node;
      setCanInit(true);
    }
  }, []);

  useEffect(() => {
    const node = nodeRef.current;

    const exec = async (node: HTMLDivElement) => {
      await init(node);
    };

    if (node && canInit) {
      exec(node)
        .then(() => {
          // console.log('image loaded');
        })
        .catch(() => {
          // console.log('image load error', err);
        });
    }
  }, [canInit]);

  useEffect(() => {
    const node = nodeRef.current;
    const firstChild = node.firstChild as HTMLImageElement;

    if (firstChild) {
      firstChild.style.cssText += cssPropertiesToString(style);
    }
  }, [style]);

  const canShowSpinner = useMemo(() => {
    return showSpinner && imageLoading;
  }, [showSpinner, imageLoading]);

  const lightBoxClass = useMemo(() => {
    return imageLoading ? cls(styles.wrapper, styles.loading) : cls(styles.wrapper, styles.loaded);
  }, [imageLoading]);

  const spinWrapperClass = useMemo(() => {
    return cls({
      [styles.spin_wrapper]: true,
      [styles.show]: canShowSpinner,
      [styles.hide]: !imageLoading,
    });
  }, [imageLoading]);

  const imageContainerClass = useMemo(() => {
    return cls({
      [styles.image_container]: true,
      [styles.loading]: imageLoading,
    });
  }, [imageLoading]);

  useEffect(() => {
    if (imageLoaded) {
      const node = nodeRef.current;
      const fallbackImage: HTMLImageElement = node.querySelector('img[data-fallback=true]');

      if (fallbackImage) {
        fallbackImage.style.height = '0px';
        // fallbackImage.classList.add(styles.reveal_image_left);
      }
    }
  }, [imageLoaded]);

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
