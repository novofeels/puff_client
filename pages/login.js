import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../components/form-elements';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import { useAppContext } from '../context/state';
import { login } from '../data/auth';

export default function Login() {
  const { setToken } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    login(user).then((res) => {
      if (res.token) {
        setToken(res.token);
        router.push('/');
      }
    });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <h1 className="title">yo wuttup sign in</h1>
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
              <button className="button is-link" type="submit">Login</button>
            </div>
            <div className="control">
              <Link href="/register" passHref>
                <button className="button is-link is-light">Register</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
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
