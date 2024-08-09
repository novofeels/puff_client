import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../components/form-elements';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { useAppContext } from '../context/state';
import { register } from '../data/auth';

export default function Register() {
  const { setToken } = useAppContext();
  const [email, setEmail] = useState('');
  const [nothing, setNothing] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
      email
    };

    register(user)
      .then((res) => {
        console.log('Response:', res);  // Log the response to debug
        if (res.token) {
          setToken(res.token);
          localStorage.setItem('token', res.token); // Save token to localStorage
          router.push('/');
        } else {
          console.error('No token found in response:', res);
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <h1 className="title">SIGN UP</h1>
          <Input
            id="email"
            value={email}
            type="text"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            id="username"
            value={username}
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="password"
            value={password}
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
            <div className="control">
              <Link href="/login">
                <button className="button is-link is-light">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
