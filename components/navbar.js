import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/state';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { token } = useAppContext();
  const hamburger = useRef();
  const navbar = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active');
    navbar.current.classList.toggle('is-active');
  };

  const getLoggedInButtons = () => {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/profile"><a className="navbar-item">Profile</a></Link>
          <hr className="navbar-divider"></hr>
          <a className="navbar-item" onClick={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            router.push('/login');
          }}>
            Log out
          </a>
        </div>
      </div>
    );
  };

  const getLoggedOutButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link href="/register">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
          </Link>
          <Link href="/login">
            <a className="button is-light">
              Log in
            </a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar mb-3 has-background-primary-light px-5 is-fixed-top is-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" style={{ width: "4rem", height: "4rem" }} className="relative" />
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref={hamburger} onClick={showMobileNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {isLoggedIn && (
            <>
              <Link href="/game"><a className="navbar-item has-text-primary-dark">PLAY GAME</a></Link>
              <Link href="/leaderboard"><a className="navbar-item has-text-primary-dark">LEADERBOARD</a></Link>
              <Link href="/achievements"><a className="navbar-item has-text-primary-dark">ACHIEVEMENTS</a></Link>
              <Link href="/feedback"><a className="navbar-item has-text-primary-dark">FEEDBACK</a></Link>
              <Link href="/score"><a className="navbar-item has-text-primary-dark">MY SCORE</a></Link>
            </>
          )}
        </div>
        <div className="navbar-end">
          {isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}
        </div>
      </div>
    </nav>
  );
}
