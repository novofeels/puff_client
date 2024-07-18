import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

import { createAchievement, deleteAchievement, getAchievements } from '../data/achievement';

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleAchieve = async (achievementId) => {
    try {
      await createAchievement(achievementId);
      fetchAchievements();
    } catch (error) {
      console.error('Error achieving achievement:', error);
    }
  };

  const handleDelete = async (achievementId) => {
    try {
      await deleteAchievement(achievementId);
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div>
      <h1 className="title">Achievements</h1>
      <div className="columns is-multiline">
        {achievements.map((achievement) => (
          <div className="column is-one-third" key={achievement.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={achievement.badge_image} alt={achievement.description} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{achievement.description}</p>
                  </div>
                </div>
                <div className="content">
                  {achievement.achieved ? (
                    <>
                      <span className="tag is-success">Achieved</span>
                      <button
                        className="button is-danger mt-2"
                        onClick={() => handleDelete(achievement.id)}
                      >
                        Delete Achievement
                      </button>
                    </>
                  ) : (
                    <button
                      className="button is-primary mt-2"
                      onClick={() => handleAchieve(achievement.id)}
                    >
                      I DID IT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Achievements.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};

export default Achievements;
