import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { getLeaderboard } from '../data/score';
import styles from '../styles/leaderboard.module.css';

function Leaderboard() {
  const [scores, setScores] = useState([]);

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
    getLeaderboard().then(scoreobjs => setScores(scoreobjs));
  }, []);

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src="/assets/scrolling_background.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1 className={styles.title}>LEADERBOARD</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>RANK</th>
                <th>USER</th>
                <th>SCORE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={index}
                  className={`${styles.card} ${index < 3 ? styles[`rank${index + 1}`] : styles.row}`}
                >
                  <td>{index + 1}</td>
                  <td>{score.user}</td>
                  <td>{score.score}</td>
                  <td>{new Date(score.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

Leaderboard.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};

export default Leaderboard;
