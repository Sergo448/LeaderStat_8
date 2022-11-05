import { useContext, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import Projects from '../Movies/Projects';
import SavedMovies from '../SavedMovies/Catalogs';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout/Layout';
import { mainApi } from '../../utils/MainApi';
import PrivateRoute from '../../hoc/PrivateRoute';

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchEnd, setIsSearchEnd] = useState(false);
  const [message, setMessage] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  let loginStatus = true;
  useContext(CurrentUserContext);
  const [titleName, setTitleName] = useState('Компании');
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  // useEffect(() => {
  //   loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  //   if (loginStatus) {
  //     tokenCheck();
  //   }
  // }, []);

  //Регистрация нового пользователя
  function onSignUp(name, email, password) {
    mainApi
      .signInSignUp('/signup', name, email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          // tokenCheck();
          setMessage('');
          return <Navigate to="/" replace />;
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setMessage('Пользователь с таким email уже существует');
        } else {
          setMessage('При регистрации пользователя произошла ошибка.');
        }
      });
  }

  //Аутентификация пользователя
  function onSignIn(password, email) {
    mainApi
      .signInSignUp('/signin', password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          // tokenCheck();
          setMessage('');
          <Navigate to="/" replace />;
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setMessage('Переданы не корректные данные для авторизации');
        }
        if (err === 'Ошибка: 401') {
          setMessage('Вы ввели неправильный логин или пароль.');
        }
        if (err === 'Ошибка: 500') {
          setMessage('На сервере произошла ошибка.');
        } else {
          setMessage(
            'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
          );
        }
      });
  }

  //Выход из учётной записи
  function onLogOut() {
    mainApi
      .signout()
      .then((res) => {
        if (res.statusCode !== 400) {
          setLoggedIn(false);
          localStorage.clear();
          setMoviesList([]);
          setSavedMoviesList([]);
          return <Navigate to="/" replace />;
        }
      })
      .catch((err) => console.log(err));
  }

  //Авторизация пользователя
  // function tokenCheck() {
  //   mainApi
  //     .getUserData('/users/me')
  //     .then((res) => {
  //       if (res.email) {
  //         localStorage.setItem('loginStatus', JSON.stringify(true));
  //         setCurrentUser(res);
  //         setMessage('');
  //         setLoggedIn(true);
  //         console.log(`tokenCheck: ${loginStatus}`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoggedIn(false);
  //       localStorage.clear();
  //     });
  // }

  //Обновление профиля пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    mainApi
      .setUserData(userData)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        localStorage.setItem(`${currentUser._id}-profile`, newUserInfo);
        setMessage('Данные успешно обновлены');
        setIsLoading(false);
        setOnEdit(false);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setMessage('Пользователь с таким email уже существует');
        } else {
          setMessage('При обновлении профиля произошла ошибка');
        }
      });
  }

  const handleMenuClick = () => {
    setIsOpen(true);
  };

  const handleCloseMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/signup"
            element={
              !loggedIn ? (
                <Register onSubmit={onSignUp} message={message} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              !loggedIn ? (
                <Login onSubmit={onSignIn} message={message} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute loggedIn={loggedIn} location={location}>
                <Layout
                  location={location.pathname}
                  loggedIn={loggedIn}
                  isOpen={isOpen}
                  titleName={titleName}
                  setTitleName={setTitleName}
                  menuClick={handleMenuClick}
                  closeMenu={handleCloseMenuClick}
                />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <Main
                  loggedIn={loggedIn}
                  isOpen={isOpen}
                  handleMenuClick={handleMenuClick}
                  handleCloseMenuClick={handleCloseMenuClick}
                  setTitleName={setTitleName}
                />
              }
            ></Route>
            <Route
              path="/projects"
              element={
                <PrivateRoute loggedIn={loggedIn} location={location}>
                  <Projects
                    moviesList={moviesList}
                    savedMoviesList={savedMoviesList}
                    setMoviesList={setMoviesList}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    location={location.pathname}
                    isSearchEnd={isSearchEnd}
                    setIsSearchEnd={setIsSearchEnd}
                    message={message}
                    setMessage={setMessage}
                    setTitleName={setTitleName}
                  />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/catalog"
              element={
                <PrivateRoute loggedIn={loggedIn} location={location}>
                  <SavedMovies
                    loggedIn={loggedIn}
                    isOpen={isOpen}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    savedMoviesList={savedMoviesList}
                    setSavedMoviesList={setSavedMoviesList}
                    location={location.pathname}
                    isSearchEnd={isSearchEnd}
                    setIsSearchEnd={setIsSearchEnd}
                    message={message}
                    setMessage={setMessage}
                    setTitleName={setTitleName}
                  />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute loggedIn={loggedIn} location={location}>
                  <Profile
                    onSubmit={handleUpdateUser}
                    onLogOut={onLogOut}
                    message={message}
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                  />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/members"
              element={
                <PrivateRoute
                  loggedIn={loggedIn}
                  location={location}
                ></PrivateRoute>
              }
            ></Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
