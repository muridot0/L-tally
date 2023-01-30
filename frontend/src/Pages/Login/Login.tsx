import styles from './Login.module.css';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { LoginContext, User } from '../../contexts/login';
import { useNavigate } from 'react-router-dom';

interface Props {
  login: (user: User) => {}
}

export default function Login({ login }: Props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: any) => {
    e.preventDefault()
    setUser({...user, username: username, email: email, password: password})
    navigate('/')
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
          <form className={styles.inputs}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor='email'>Email address</label>
            <input type='text' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className={styles.submit}>
              <button onClick={(e) => handleLogin(e)}>Log in</button>
            </div>
          </form>
          <div className={styles.toggleSignIn}>
            <p>Not registered yet?</p>
            <a href='/'>
              Create an account
              <span className={clsx('material-symbols-rounded', styles.forwardIcon)}>
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
