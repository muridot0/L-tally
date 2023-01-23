import styles from './Login.module.css';
import clsx from 'clsx';

export default function Login() {
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
            <label htmlFor='name'>Full name</label>
            <input type='text' id='name' />
            <label htmlFor='email'>Email address</label>
            <input type='text' id='email' />
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' />
            <div className={styles.submit}>
              <button>Log in</button>
            </div>
          </form>
          <div className={styles.toggleSignIn}>
            <p>Not registered yet?</p>
            <a href='/'>
              Create an account
              <span className={clsx('material-symbols-rounded')}>
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
