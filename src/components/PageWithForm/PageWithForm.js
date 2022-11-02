import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hoc/useFormWithValidation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './PageWithForm.css';

export default function PageWithForm({
  onSubmit,
  userName,
  setUserName,
  message,
  loggedIn,
  isOpen,
  menuClick,
  closeMenu,
  ...props
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { values, handleChange, resetForm, errors, isValid, setIsValid } =
    useFormWithValidation();
  const [activeMessage, setActiveMessage] = useState('');
  const location = useLocation();

  function handleValueChanger(e) {
    handleChange(e);
  }

  function handleSubmitSignup(e) {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setUserName('');
    setEmail('');
    setPassword('');
  }

  function handleSubmitSignin(e) {
    e.preventDefault();
    onSubmit({ password: values.password, email: values.email });
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (message) {
      setIsValid(false);
      setActiveMessage(message);
    }
  }, [message]);

  useEffect(() => {
    setActiveMessage('');
    resetForm({}, {}, true);
  }, [location]);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openMenu={menuClick}
        closeMenu={closeMenu}
        location={location}
      ></Header>
      <div className="auth">
        <div className="auth__container">
          <h2 className="auth__title">{props.title}</h2>
          <form
            onSubmit={
              props.formName === 'register'
                ? handleSubmitSignup
                : handleSubmitSignin
            }
            className={`auth__form auth__${props.formName}-form`}
            name={`${props.formName}_form`}
            action="#"
          >
            <div className="auth__formInputBlock auth__formBlock">
              <label htmlFor="userEmail" className="auth__input-label">
                Ваша почта
              </label>
              <input
                className="auth__field"
                type="email"
                value={values.email || ''}
                onChange={handleValueChanger}
                name="email"
                autoComplete="email"
                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              ></input>
              <span className="user-email-input-error input-error_auth">
                {errors.email || ''}
              </span>
              <label htmlFor="userPassword" className="auth__input-label">
                Пароль
              </label>
              <input
                id={props.inputId}
                className="auth__field"
                type="password"
                value={values.password || ''}
                onChange={handleValueChanger}
                name="password"
                autoComplete="current-password"
                required
              ></input>
              <span className="user-password-input-error input-error_auth">
                {errors.password || activeMessage || ''}
              </span>
              {location.pathname === '/signup' ? (
                <>
                  <label htmlFor="userName" className="auth__input-label">
                    Имя
                  </label>
                  <input
                    className="auth__field"
                    type="text"
                    value={values.name || ''}
                    onChange={handleValueChanger}
                    name="name"
                    autoComplete="name"
                    minLength="2"
                    maxLength="28"
                    pattern="[а-яА-Яa-zA-ZёË0-9\- ]{1,}"
                    required
                  ></input>
                  <span className="input-error_auth">{errors.name || ''}</span>
                  <label htmlFor="userSurname" className="auth__input-label">
                    Фамилия
                  </label>
                  <input
                    className="auth__field"
                    type="text"
                    value={values.surname || ''}
                    onChange={handleValueChanger}
                    name="surname"
                    autoComplete="surname"
                    minLength="2"
                    maxLength="28"
                    pattern="[а-яА-Яa-zA-ZёË0-9\- ]{1,}"
                    required
                  ></input>
                  <span className="input-error_auth">
                    {errors.surname || ''}
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="auth__formBottonBlock auth__formBlock">
              <button
                className="main__btn auth__form-submit app__btn-opacity"
                type="submit"
                disabled={!isValid}
              >
                {props.btnText}
              </button>
              {location.pathname === '/signin' ? (
                <>
                  <p className="auth__login-text">
                    {props.linkToRecoveryText}
                    <Link
                      className="auth__login-link app__btn-opacity"
                      to={props.linkToRecovery}
                    >
                      {props.recoveryLinkText}
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p className="auth__agreement">
                    Регистрируясь, вы соглашаетесь с{' '}
                    <Link
                      className="auth__agreement app__btn-opacity"
                      to={'/EULA'}
                    >
                      Пользовательским соглашением
                    </Link>{' '}
                    и{' '}
                    <Link
                      className="auth__agreement app__btn-opacity"
                      to={'/privacy'}
                    >
                      Политикой конфидетциальности
                    </Link>
                  </p>
                </>
              )}
              <p className="auth__login-text">
                {props.underBtnText}
                <Link
                  className="auth__login-link app__btn-opacity"
                  to={props.linkTo}
                >
                  {props.linkText}
                </Link>
              </p>
            </div>
          </form>
        </div>
        {/* <p className='auth__login-text auth__coryright'>LeaderStat 2023</p> */}
      </div>
      <Footer location={location}></Footer>
    </>
  );
}
