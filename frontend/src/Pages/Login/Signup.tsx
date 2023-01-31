import styles from './Login.module.css';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { LoginContext, User } from '../../contexts/login';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';

export default function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUp(e: any) {
    e.preventDefault()
    await AuthService.register(username, email, password).then(() => {
      navigate("/");
      // window.location.reload();
    });
    setUser({...user, username: username, email: email, password: password})
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
              <button onClick={(e) => handleSignUp(e)}>Sign up</button>
            </div>
          </form>
          <div className={styles.toggleSignIn}>
            <p>Already got an account?</p>
            <Link to={'/login'}>
              Log in
              <span className={clsx('material-symbols-rounded', styles.forwardIcon)}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
