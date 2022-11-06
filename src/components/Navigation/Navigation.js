import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ loggedIn, isOpen, closeMenu, menuClass, ...props }) {
  return (
    <nav className={`nav nav__${menuClass} ${loggedIn ? '' : 'block__hide'}`}>
      {props.children}
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/classifiers"
      >
        Классификаторы
      </NavLink>
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/catalog"
      >
        Справочники
      </NavLink>
      <NavLink
        className={`nav__link app__btn-opacity nav__link_${menuClass}`}
        onClick={closeMenu}
        to="/estimate"
      >
        Cметы
      </NavLink>
    </nav>
  );
}
