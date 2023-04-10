// hook for calculating the image download progress
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFileDownloader } from './useFileDownloader';

// generate type definition for the hook
const useImageProgress = (src: string, fallback?: string) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { downloadFile, blob, progress } = useFileDownloader(src);

  const nodeRef = useRef<HTMLElement | null>(null);
  const imageURl = useRef<string | null>(null);
  const fallbackRef = useRef<HTMLImageElement | null>(null);

  const init = useCallback(
    async (node: HTMLElement) => {
      nodeRef.current = node;
      if (fallback) {
        const image = new Image();
        image.src = fallback;
        image.setAttribute('data-fallback', 'true');
        node.style.cssText =
          'position: absolute; top: 0; left: 0; width: 100%; height: 100%;z-index: 2;';
        fallbackRef.current = node.appendChild(image);
      }
      setImageLoading(true);
      await downloadFile();
    },
    [fallback]
  );

  useEffect(() => {
    if (blob && nodeRef.current && !imageLoaded) {
      const image = new Image();
      image.style.cssText =
        'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;';

      image.onload = () => {
        const node = nodeRef.current;
        node?.appendChild(image);

        setTimeout(() => {
          setImageLoaded(true);
          setImageLoading(false);
        }, 200);
      };

      image.onerror = () => {
        setImageLoaded(false);
        setError(true);
        setImageLoading(false);
      };

      imageURl.current = URL.createObjectURL(blob);

      image.src = imageURl.current;
    }
  }, [blob, imageLoaded]);

  //write the cleanup
  useEffect(() => {
    return () => {
      if (imageURl.current) {
        URL.revokeObjectURL(imageURl.current);
      }
    };
  }, []);

  return { progress, init, imageLoaded, error, imageLoading };
};

export { useImageProgress };
