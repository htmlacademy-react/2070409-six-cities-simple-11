import { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REG_EXP_EMAIL } from '../../const/regex';
import RouterPaths from '../../const/routerPaths';
import { useDispatchTyped, useSelectorTyped } from '../../hooks/typedWrappers';
import headerLogo from '../../img/logo.svg';
import { loginAction } from '../../store/apiActions';
import { authorizationStatusSelector } from '../../store/selectors';
import { toast } from 'react-toastify';


function LoginPage ():JSX.Element {
  const dispatch = useDispatchTyped();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const isAuthorized = useSelectorTyped(authorizationStatusSelector);

  if (isAuthorized) {
    navigate(RouterPaths.main);
  }

  const signInButtonHandle = (evt: FormEvent<HTMLFormElement>) => {
    const isPasswordStrong = (password: string) => /[a-zA-Z]/g.test(password) && /[0-9]/g.test(password);
    const isEmailValid = (email: string) => REG_EXP_EMAIL.test(email);
    evt.preventDefault();

    if (passwordRef.current && !isPasswordStrong(passwordRef.current.value)) {
      toast.warn('Password must contain at least one letter and one number');
      return;
    }
    if (loginRef.current && passwordRef.current && isEmailValid(loginRef.current.value)) {
      dispatch(loginAction({authData: {
        email: loginRef.current.value,
        password: passwordRef.current.value
      }}));
    }

  };

  return (
    <div className="page page--gray page--login">
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={RouterPaths.main}>
                <img className="header__logo" src={headerLogo} alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={signInButtonHandle} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={RouterPaths.main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
