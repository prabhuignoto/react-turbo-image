// hook for calculating the image download progress
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFileDownloader } from './useFileDownloader';

// generate type definition for the hook
const useImageProgress = (src: string, fallback?: string) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
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
        fallbackRef.current = node.appendChild(image);
      }
      setLoadingImage(true);
      await downloadFile();
    },
    [fallback]
  );

  useEffect(() => {
    if (blob && nodeRef.current && !loaded) {
      const image = new Image();
      const node = nodeRef.current;

      image.onload = () => {
        setLoaded(true);
      };

      image.onerror = () => {
        setLoaded(false);
        setError(true);
        setLoadingImage(false);
      };

      imageURl.current = URL.createObjectURL(blob);

      image.src = imageURl.current;

      setTimeout(() => {
        if (fallbackRef.current) {
          node.removeChild(fallbackRef.current);
        }
        setLoadingImage(false);
        node.appendChild(image);
      }, 200);
    }
  }, [blob, loaded]);

  //write the cleanup
  useEffect(() => {
    return () => {
      if (imageURl.current) {
        URL.revokeObjectURL(imageURl.current);
      }
    };
  }, []);

  return { progress, init, loaded, error, loadingImage };
};

export { useImageProgress };
