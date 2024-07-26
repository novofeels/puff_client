import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { getLeaderboard } from '../data/score';
import styles from '../styles/leaderboard.module.css';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getLeaderboard().then(scoreobjs => setScores(scoreobjs));
  }, []);

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src="/assets/scrolling_background.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Leaderboard</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index} className={index < 3 ? styles[`rank${index + 1}`] : styles.row}>
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
