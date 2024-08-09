import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import Navbar from '../components/navbar';
import styles from '../styles/playgame.module.css';
import { useAppContext } from '../context/state';

const PlayGame = () => {
  const { token, setToken } = useAppContext();
  const unityContext = useUnityContext({
    loaderUrl: "/unity/Build/Builds.loader.js",
    dataUrl: "/unity/Build/Builds.data",
    frameworkUrl: "/unity/Build/Builds.framework.js",
    codeUrl: "/unity/Build/Builds.wasm",
  });

  const { unityProvider, isLoaded, loadingProgression, sendMessage } = unityContext;

  useEffect(() => { 
    setToken(localStorage.getItem('token'));
    let isUnityMounted = false;
  
    const cleanupUnity = () => {
      console.log("Attempting to clean up Unity instance");
      if (window.gameInstance) {
        if (typeof window.gameInstance.Quit === 'function') {
          console.log("Calling Quit on Unity instance");
          window.gameInstance.Quit();
        } else {
          console.log("Unity instance found, but Quit method is not available");
        }
        // Attempt to remove the Unity canvas and container
        const unityCanvas = document.querySelector("#unity-canvas");
        const unityContainer = document.querySelector("#unity-container");
        if (unityCanvas) unityCanvas.remove();
        if (unityContainer) unityContainer.remove();
      } else {
        console.log("No Unity instance found on window object");
      }
      // Clear global references
      window.gameInstance = undefined;
      window.unityInstance = undefined;
    };
  
    const initUnity = () => {
      isUnityMounted = true;
      // Your Unity initialization code here
    };
  
    initUnity();
  
    // Cleanup function
    return () => {
      // Force a hard refresh
      window.location.reload(true);
    
    };
  }, [setToken]);

  return (
    <div className={styles.container}>
      <Navbar />
      {!isLoaded && (
        <p>Loading Game... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        className={styles.unity}
      />
    </div>
  );
};

export default PlayGame;
