import Layout from '../components/layout';
import Navbar from '../components/navbar';
import styles from '../styles/index.module.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Index() {
  const text =
  "I'm Puff!\\n\\nDivers are always trying to harvest my venom to poison there political rivals, so I need your help!\\n\\nUse the arrow keys or WASD (if you're a nerd) to move me around.\\n\\nClick your mouse to shoot.\\n\\nMake sure to run over bubbles to get ammo and avoid those pesky mines!\\n\\nWhen you're ready, select 'Play Game'.\\n\\nAnd don't forget to leave me feedback with your ideas to add to the game!";


  const defaultText = "What are you waiting for, click on me!";
  const [displayedText, setDisplayedText] = useState(defaultText);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [emphasizingYOUR, setEmphasizingYOUR] = useState(false);

  // Ensure sounds are loaded correctly
  const highBlip = typeof Audio !== "undefined" ? new Audio('/assets/HighBlip.mp3') : null;
  const mediumBlip = typeof Audio !== "undefined" ? new Audio('/assets/MediumBlip.mp3') : null;
  const lowBlip = typeof Audio !== "undefined" ? new Audio('/assets/LowBlip.mp3') : null;
  const ambience = typeof Audio !== "undefined" && new Audio('/assets/ambience.mp3');
  useEffect(() => {
    
    ambience.play();
    return () => {
      // Function to gradually decrease the volume
      const fadeOutVolume = () => {
        let volume = ambience.volume;
        const interval = setInterval(() => {
          if (volume > 0) {
            volume = Math.max(0, volume - 0.1); // Adjust the decrement value as needed
            ambience.volume = volume;
          } else {
            clearInterval(interval);
            ambience.pause(); // Stop the ambience when volume reaches 0
          }
        }, 100); // Adjust the interval time as needed
      };
      fadeOutVolume();
    };
  }, []);
  
  useEffect(() => {
    if (isActive && index < text.length && !pause) {
      const currentChar = text[index];
      let beep;
      let delay = currentChar === " " ? 100 : 35; // Default delay

      if (
        index === 0 ||
        (".!?".includes(text[index - 1]) &&
          text[index - 1] !== undefined &&
          text[index] !== " ")
      ) {
        beep = highBlip;
      } else if (".!?".includes(currentChar)) {
        beep = lowBlip;
      } else {
        beep = mediumBlip;
      }

      if (beep) {
        beep.volume = 0.02;
      }

      if (text.substring(index).startsWith("\\n\\n")) {
        if (beep) beep.play();
        setPause(true);
        setTimeout(() => {
          setDisplayedText((prev) => prev + "\n\n");
          setIndex(index + 4);
          setPause(false);
        }, 400);
        return;
      }

      if (
        (text.substring(index, index + 4) === "YOUR" && !emphasizingYOUR) ||
        text.substring(index, index + 4) === "...."
      ) {
        setEmphasizingYOUR(true);
      }

      if (emphasizingYOUR) {
        delay = 500; // Slowed down emphasis
        if (
          (currentChar === "R" &&
            text.substring(index - 3, index + 1) === "YOUR") ||
          (currentChar === "." &&
            text.substring(index - 3, index + 1) === "....")
        ) {
          setEmphasizingYOUR(false);
        }
      } else {
        delay = currentChar === " " ? 80 : 70; // Normal delay
      }

      if (beep) beep.play();
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentChar);
        setIndex(index + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [index, pause, isActive, emphasizingYOUR]);

  useEffect(() => {
    let gifTimer;
    if (isActive) {
      const gifDuration = 35000;
      gifTimer = setTimeout(() => {
        setIsActive(false);
        setIndex(0); // Reset index to start text from beginning on next activation
      }, gifDuration);
    }

    return () => clearTimeout(gifTimer);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setDisplayedText(""); // Clear the default text
    setIndex(0); // Start from the beginning of the provided text
  };

  return (
    <div className={styles.container4welcome}>
      <Image
        src={'/assets/puffSwim.gif'}
        alt="puff"
        className={styles.puffGif}
        onClick={handleStart}
        width={80}
        height={80}
      />
      <div className={styles.textBubble}>{displayedText}</div>
    </div>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
}
