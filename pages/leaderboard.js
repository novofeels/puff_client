import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { getLeaderboard } from '../data/score';


function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
   getLeaderboard().then(scoreobjs => setScores(scoreobjs));
    
  }, []);

  

  return (
    <div>
      <h1 className="title">Leaderboard</h1>
      <div className="table-container">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.user}</td>
                <td>{score.score}</td>
                <td>{new Date(score.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
