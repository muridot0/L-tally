import styles from './Login.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth-service';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUserNameFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [validPwd, password]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [validUsername, username]);

  useEffect(() => {
    setValidEmail(() => {
      if (!email) {
        return false;
      }
      if (email && typeof email !== 'undefined') {
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf('@@') === -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2
          )
        ) {
          return false;
        }
      }
      return true;
    });
  }, [email, validEmail]);

  useEffect(() => {
    setMessage('');
  }, [username, email, password]);

  async function handleSignUp(e: any) {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = validEmail;

    if (!v1 || !v2 || !v3) {
      setMessage('Invalid entry');
    }

    await AuthService.register(username, email, password).then(
      () => {
        const strategy = 'login';
        AuthService.login(username, password, strategy).then(() => {
          navigate('/');
          window.location.reload();
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
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
            <label htmlFor='username'>
              Username
              {validUsername ? (
                <span className={clsx('material-symbols-rounded', styles.done)}>
                  done
                </span>
              ) : !username ? null : (
                <span
                  className={clsx('material-symbols-rounded', styles.close)}
                >
                  close
                </span>
              )}
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onFocus={() => setUserNameFocus(true)}
              onBlur={() => setUserNameFocus(false)}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameFocus && !validUsername ? (
              <p className={styles.validationInfo}>
                <span className={clsx('material-symbols-rounded', styles.info)}>
                  info
                </span>{' '}
                4 to 24 characters.
                <br /> Must begin with a letter. <br /> Letters, numbers,
                underscores and hyphens allowed.
              </p>
            ) : null}
            <label htmlFor='email'>
              Email address
              {validEmail ? (
                <span className={clsx('material-symbols-rounded', styles.done)}>
                  done
                </span>
              ) : !email ? null : (
                <span
                  className={clsx('material-symbols-rounded', styles.close)}
                >
                  close
                </span>
              )}
            </label>
            <input
              type='text'
              id='email'
              value={email}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailFocus && !validEmail ? (
              <p className={styles.validationInfo}>
                <span className={clsx('material-symbols-rounded', styles.info)}>
                  info
                </span>{' '}
                Invalid email address format.
                <br /> Must be in the form "exampleemail@email.com".
              </p>
            ) : null}
            <label htmlFor='password'>
              Password
              {validPwd ? (
                <span className={clsx('material-symbols-rounded', styles.done)}>
                  done
                </span>
              ) : !password ? null : (
                <span
                  className={clsx('material-symbols-rounded', styles.close)}
                >
                  close
                </span>
              )}
            </label>
            <input
              type='text'
              id='password'
              value={password}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {pwdFocus && !validPwd ? (
              <p className={styles.validationInfo}>
                <span className={clsx('material-symbols-rounded', styles.info)}>
                  info
                </span>{' '}
                8 to 24 characters.
                <br /> Must include uppercase and lowercase letters, a number
                and a special character.
                <br />
                Allowed special characters:{' '}
                <span aria-label='exclamation mark'>! </span>
                <span aria-label='at symbol'>@ </span>
                <span aria-label='hashtag'># </span>
                <span aria-label='dollar sign'>$ </span>
                <span aria-label='percent'>% </span>
              </p>
            ) : null}
            <div className={styles.submit}>
              <button
                type='submit'
                className={
                  validUsername && validPwd ? styles.btn : styles.disabledBtn
                }
                onClick={(e) => handleSignUp(e)}
                disabled={
                  !validUsername || !validPwd || !validEmail ? true : false
                }
              >
                Sign up
              </button>
            </div>
          </form>
          <div className={styles.toggleSignIn}>
            <p>Already got an account?</p>
            <Link to={'/login'}>
              Log in
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
