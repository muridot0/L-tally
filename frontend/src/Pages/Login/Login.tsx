import styles from './Login.module.css';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth-service';
import { SpaceContext } from '../../contexts/space';
import { SpaceService } from '../../services/space-service';

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setActiveMenuItem } = useContext(SpaceContext);

  useEffect(() => {
    setMessage('');
  }, [username, password]);

  async function handleLogin(e: any) {
    e.preventDefault();
    const strategy = 'login';
    await AuthService.login(username, password, strategy)
      .then(() => {
        const getUserId = () => {
          const loggedInUser = window.localStorage.getItem("user");
          if(!loggedInUser){
            return;
          }
          const parsedUser = JSON.parse(loggedInUser)
          return parsedUser.user._id
        }
         SpaceService.getSpacesByUserId(getUserId()).then((res: any) => {
          navigate(res.data[0]['route'])
         })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setMessage('Invalid username or password');
        } else {
          setMessage('No server response');
        }
      })
  }



  return (
    <>
      <div className={styles.logo}>
        <span className={clsx('material-symbols-rounded', styles.icon)}>
          scoreboard
        </span>
        <div>
          <p className={styles.headerTop}>L-Tally</p>
          <p className={styles.headerBottom}>Keeping score ...</p>
        </div>
      </div>
      <div className={styles.login}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>
            <span className={clsx('material-symbols-rounded', styles.icon)}>
              scoreboard
            </span>
            <p className={styles.headerTop}>L-Tally</p>
          </div>
          <h2 className={styles.loginHeader}>Log in</h2>
          {message && <p className={styles.invalid}>{message}</p>}
          <form className={styles.inputs}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.submit}>
              <button
                type='submit'
                onClick={(e) => handleLogin(e)}
                className={
                  username && password ? styles.btn : styles.disabledBtn
                }
                disabled={!username || !password ? true : false}
              >
                Log in
              </button>
            </div>
          </form>
          <div className={styles.toggleSignIn}>
            <p>Not registered yet?</p>
            <Link to='/signup'>
              Create an account
              <span
                className={clsx('material-symbols-rounded', styles.forwardIcon)}
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
