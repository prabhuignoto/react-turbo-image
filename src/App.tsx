import { useEffect, useState } from 'react';
import './App.css';
import LightBox from './components/light-box';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <LightBox
        width={800}
        height={700}
        style={{ borderRadius: '10px' }}
        src={
          'https://images.unsplash.com/photo-1680675313845-13d3f5f17080?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format'
        }
        fallbackURL="https://images.unsplash.com/photo-1680675313845-13d3f5f17080?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=50"
      />
      <LightBox
        width={800}
        height={700}
        style={{ borderRadius: '10px' }}
        loadingAnimationType="circular_progress"
        src={
          'https://images.unsplash.com/photo-1680675805063-3aa8b3607b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
        }
        fallbackURL="https://images.unsplash.com/photo-1680675805063-3aa8b3607b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=50&h=50"
      />
      <LightBox
        width={800}
        height={700}
        style={{ borderRadius: '10px' }}
        loadingAnimationType="progress_bar"
        src={
          'https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80'
        }
        fallbackURL="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=50&h=50"
      />
    </div>
  );
}

export default App;
