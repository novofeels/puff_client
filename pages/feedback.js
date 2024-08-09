import styles from '../styles/feedbacks.module.css';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { useState, useEffect, useRef } from 'react';
import { sendFeedback } from '../data/feedback'; // Adjust the path if needed
import { stopUnityGame } from '../data/unity';

function Feedbacks() {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef(null);
  const success = typeof Audio !== "undefined" && new Audio('/assets/success.wav');
  const error = typeof Audio !== "undefined" && new Audio('/assets/error.wav');
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback) {
      error.play();
      setMessage('Please enter your feedback');
      return;
    }

    setMessage(''); // Clear any previous messages

    try {
      const response = await sendFeedback({ feedback });

      if (response && response.id) {
        success.play();
        setMessage('Feedback submitted successfully, THANK YOU!');
        setFeedback(''); // Clear the textarea
        setSubmitted(true); // Hide the form
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src="/assets/scrolling_background.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1 className={styles.title}>FEEDBACK</h1>

        <p className={styles.instructions}>HOW CAN I MAKE THIS GAME BETTER?</p>
        {message && <p className={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            ref={textareaRef}
            className={`${submitted ? styles.hiddentext : styles.textarea}`}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            rows="5"
            disabled={submitted} // Disable textarea after submitting
          />
          <button
            type="submit"
            className={`${submitted ? styles.hiddenbutton : styles.submitButton}`}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

Feedbacks.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};

export default Feedbacks;
