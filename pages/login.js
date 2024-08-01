import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { useAppContext } from '../context/state';
import { login, register } from '../data/auth'; // Make sure to implement register function in your data/auth module
import styles from '../styles/login.module.css';
import Image from 'next/image';

export default function Login() {
  const { setToken } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  // Create an audio instance
  const switchSound = typeof Audio !== "undefined" && new Audio('/assets/switch.wav');

  const handleSwitchClick = () => {
    if (switchSound) {
      switchSound.play();
    }
    setIsSwitchOn(!isSwitchOn);
    setIsRegister(false);
  };

  useEffect(() => {
    if (isSwitchOn) {
      // Start the video and animation when the switch is flipped
      const video = document.getElementById('backgroundVideo');
      video.play();
    }
  }, [isSwitchOn]);

  const submit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    if (isRegister) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      register(user).then((res) => {
        if (res.token) {
          setToken(res.token);
          router.push('/');
        }
      });
    } else {
      login(user).then((res) => {
        if (res.token) {
          setToken(res.token);
          router.push('/');
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.switchContainer}>
        <Image
          src={isSwitchOn ? '/assets/switchOn.png' : '/assets/switchOff.png'}
          alt="Light Switch"
          className={styles.switch}
          onClick={handleSwitchClick}
          width={200}
          height={200}
        />
      </div>
      {isSwitchOn && (
        <>
          <video
            id="backgroundVideo"
            className={styles.videoBackground}
            autoPlay
            loop
            muted
          >
            <source src="/assets/login.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <main className={styles.authContainer}>
            <section>
              <form className={styles.authForm} onSubmit={submit}>
                <h1 className={styles.header699}>PUFF</h1>
                <div>
                  <input
                    type="text"
                    className={styles.authInput}
                    onChange={(evt) => setUsername(evt.target.value)}
                    placeholder="Username"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className={styles.authInput}
                    onChange={(evt) => setPassword(evt.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                {isRegister && (
                  <div>
                    <input
                      type="password"
                      className={styles.authInput2}
                      onChange={(evt) => setConfirmPassword(evt.target.value)}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                )}
                <button className={styles.funButton} type="submit">
                    {isRegister ? 'Register' : 'Sign in'}
                  </button>
                <div className={styles.bottomContainer}>
                  
                  <div className={styles.registerText}>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}</div>
                    <span
                      className={styles.registerLink} 
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister ? 'SIGN IN' : 'REGISTER'}
                    </span>
                  </div>
                
              </form>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
