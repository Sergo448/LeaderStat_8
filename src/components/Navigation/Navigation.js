import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ loggedIn, isOpen, closeMenu, menuClass, ...props }) {
  return (
    <nav className={`nav nav__${menuClass} ${loggedIn ? '' : 'block__hide'}`}>
      {props.children}
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/projects"
      >
        Проекты
      </NavLink>
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/activity"
      >
        Мероприятия
      </NavLink>
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/members"
      >
        Участники
      </NavLink>
    </nav>
  );
}
