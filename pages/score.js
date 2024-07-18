import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { getUserScore, submitScore } from '../data/score';

export default function Score() {
  const [score, setScore] = useState(null);
  const [newScore, setNewScore] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUserScore();
  }, []);

  const fetchUserScore = async () => {
    try {
      const data = await getUserScore();
      setScore(data);
    } catch (error) {
      console.error('Error fetching user score:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Number.isInteger(parseInt(newScore))) {
      setPopupMessage('Please enter a valid integer score.');
      setShowPopup(true);
      return;
    }

    try {
      const response = await submitScore({ score: parseInt(newScore) });
      setPopupMessage(response.message || 'Score submitted successfully!');
      setShowPopup(true);
      fetchUserScore();
      setNewScore('');
    } catch (error) {
      setPopupMessage('Error submitting new score.');
      setShowPopup(true);
      console.error('Error submitting new score:', error);
    }
  };

  return (
    <div>
      <h1 className="title">My Score</h1>
      <div className="box">
        {score ? (
          <div>
            <h2 className="subtitle">Current Score</h2>
            <p className="is-size-4">{score.score}</p>
            <p className="is-size-6 has-text-grey">Achieved on: {new Date(score.date).toLocaleString()}</p>
          </div>
        ) : (
          <p className="has-text-danger">No score found.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">New Score</label>
          <div className="control">
            <input
              className="input"
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            Update Score
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>{popupMessage}</p>
              <button
                className="button is-primary mt-2"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowPopup(false)}
          ></button>
        </div>
      )}
    </div>
  );
}

Score.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
