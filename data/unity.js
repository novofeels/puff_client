// utils/UnityControl.js

export function pauseUnityGame() {
    if (window.unityInstance && window.unityInstance.Module) {
        window.unityInstance.Module.PauseGame();
    }
}

export function resumeUnityGame() {
    if (window.unityInstance && window.unityInstance.Module) {
        window.unityInstance.Module.ResumeGame();
    }
}

export function stopUnityAudio() {
    if (window.unityInstance && window.unityInstance.Module) {
        window.unityInstance.Module.StopAudio();
    }
}

export function startUnityAudio() {
    if (window.unityInstance && window.unityInstance.Module) {
        window.unityInstance.Module.StartAudio();
    }
}

export function stopUnityGame() {
    if (window.unityInstance && window.unityInstance.Module) {
        window.unityInstance.Module.StopGame();
    }
}
