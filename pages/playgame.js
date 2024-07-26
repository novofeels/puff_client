import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import Navbar from '../components/navbar';
import styles from '../styles/playgame.module.css';
import { useAppContext } from '../context/state';

const PlayGame = () => {
  const { token, setToken } = useAppContext();
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unity/Build/Builds.loader.js",
    dataUrl: "/unity/Build/Builds.data",
    frameworkUrl: "/unity/Build/Builds.framework.js",
    codeUrl: "/unity/Build/Builds.wasm",
  });
useEffect(() => { 
  setToken(localStorage.getItem('token'));
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

