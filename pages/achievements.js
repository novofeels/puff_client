import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { createAchievement, deleteAchievement, getAchievements } from '../data/achievement';
import styles from '../styles/achievements.module.css';
import Image from 'next/dist/client/image';

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
    <div className={styles.achievementsContainer}>
      <video
            id="backgroundVideo"
            className={styles.videoBackground}
            autoPlay
            loop
            muted
          >
            <source src="/assets/scrolling_background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.overlay}>
      <h1 className={styles.title}>ACHIEVEMENTS</h1>
      <div className={styles.cardsContainer}>
        {achievements.map((achievement) => (
          <div className={styles.card} key={achievement.id}>
            <div className={styles.cardImage}>
              <figure className={styles.image}>
                <Image
                  src="/assets/firstBlub.png"  // Static image path
                  alt={achievement.description}
                  className={achievement.achieved ? styles.fullColor : styles.faded}
                  width={300}
                  height={300}
                />
              </figure>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>{achievement.description}</p>  {/* Dynamic description */}
              <div className={styles.actions}>
                
              </div>
            </div>
          </div>
        ))}
      </div>
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

