import { useState } from 'react';

const useFileDownloader = (url: string) => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const downloadFile = async () => {
    try {
      const response = await fetch(url);

      // Get the total size of the file from the Content-Length header
      const totalSize = parseInt(response.headers.get('Content-Length') || '', 10);
      let loadedSize = 0;

      // Set up a ReadableStream to read the response body
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (!reader) {
        return;
      }

      // Define a function to read the response body and update the progress
      const read = async () => {
        const { done, value } = await reader.read();
        if (done) {
          const blob = new Blob(chunks, { type: 'image/jpeg' });
          setBlob(blob);
          return true;
        }

        // Update the loaded size and calculate the progress percentage
        loadedSize += value.length;
        const percentComplete = (loadedSize / totalSize) * 100;
        setProgress(percentComplete);

        chunks.push(value);

        // Read the next chunk of data
        await read();
      };

      // Start reading the response body
      await read();
    } catch (error) {
      // eslint-disable-next-line no-console
      return Promise.reject(error);
    }
  };

  return { downloadFile, blob, progress };
};

export { useFileDownloader };
