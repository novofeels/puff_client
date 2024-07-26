import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import Navbar from '../components/navbar';
import styles from '../styles/playgame.module.css';

const PlayGame = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unity/Build/WebGL.loader.js",
    dataUrl: "/unity/Build/WebGL.data",
    frameworkUrl: "/unity/Build/WebGL.framework.js",
    codeUrl: "/unity/Build/WebGL.wasm",
  });

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

