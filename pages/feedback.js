import styles from '../styles/feedbacks.module.css';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { useState } from 'react';
import { sendFeedback } from '../data/feedback'; // Adjust the path if needed

function Feedbacks() {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!feedback) {
      setMessage('Please enter your feedback');
      return;
    } else {
        sendFeedback({ feedback })
        .then(response => {
          // Use a ternary operator to handle success or error
          response && response.id
            ? (setMessage('Feedback submitted successfully, THANK YOU!'), setFeedback(''), setSubmitted(true))
            : setMessage('An error occurred. Please try again.');
        });
  };
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
             className={`${submitted ? styles.hiddentext : styles.textarea}`}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            rows="5"
          />
          <button type="submit" className={`${submitted ? styles.hiddenbutton : styles.submitButton}`}>SUBMIT</button>
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


/*  return (
    <div className={styles.container}>
        <video autoPlay loop muted className={styles.video}>
        <source src="/assets/scrolling_background.mp4" type="video/mp4" />
      </video>
      <h1 className={styles.title}>Feedback</h1>
      <div className={styles.feedbackContainer}>
        <p className={styles.instructions}>We value your feedback! Please enter your comments or suggestions below:</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            rows="5"
          />
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );*/