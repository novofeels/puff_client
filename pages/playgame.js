import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import Navbar from '../components/navbar';


const PlayGame = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unity/Build/WebGL.loader.js",
    dataUrl: "/unity/Build/WebGL.data",
    frameworkUrl: "/unity/Build/WebGL.framework.js",
    codeUrl: "/unity/Build/WebGL.wasm",
  });

  return (
    <div>
      <Navbar /> {/* Add the Navbar component here */}
      {!isLoaded && (
        <p>Loading Game... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity 
        unityProvider={unityProvider}
        style={{ width: 1920, height: 1080}}
      />
    </div>
  );
};

export default PlayGame;
