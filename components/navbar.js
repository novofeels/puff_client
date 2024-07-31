import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/state';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const { token, setToken } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className={`${styles.navbar} ${styles.fixedTop}`} role="navigation" aria-label="main navigation">
      <div className={styles.navbarBrand}>
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.navbarMenu}>
        <div className={styles.navbarStart}>
          {isLoggedIn && (
            <>
              <Link href="/playgame"><a className={styles.navbarItem}>PLAY GAME</a></Link>
              <Link href="/leaderboard"><a className={styles.navbarItem}>LEADERBOARD</a></Link>
              <Link href="/achievements"><a className={styles.navbarItem}>ACHIEVEMENTS</a></Link>
              <Link href="/feedback"><a className={styles.navbarItem}>FEEDBACK</a></Link>
              
            </>
          )}
        </div>
        <div className={styles.navbarEnd}>
          {isLoggedIn ? (
            <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>Log out</button>
          ) : (
            <div className={styles.buttons}>
              <Link href="/register">
                <a className={`${styles.button} ${styles.primaryButton}`}>
                  <strong>Sign up</strong>
                </a>
              </Link>
              <Link href="/login">
                <a className={`${styles.button} ${styles.lightButton}`}>Log in</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
