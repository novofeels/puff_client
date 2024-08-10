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
          <img src="/puff_client/assets/logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.navbarMenu}>
        <div className={styles.navbarStart}>
          {isLoggedIn && (
            <>
              <Link href="/playgame" className={styles.navbarItem}>PLAY GAME</Link>
              <Link href="/leaderboard" className={styles.navbarItem}>LEADERBOARD</Link>
              <Link href="/achievements" className={styles.navbarItem}>ACHIEVEMENTS</Link>
              <Link href="/feedback" className={styles.navbarItem}>FEEDBACK</Link>
            </>
          )}
        </div>
        <div className={styles.navbarEnd}>
          {isLoggedIn ? (
            <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>Log out</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}
