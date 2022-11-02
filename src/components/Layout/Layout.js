import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MenuPage from '../MenuPage/MenuPage';
import './Layout.css';

export default function Layout({
  location,
  loggedIn,
  isOpen,
  menuClick,
  closeMenu,
  titleName,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openMenu={menuClick}
        closeMenu={closeMenu}
        location={location}
      ></Header>
      <main className="main">
        <MenuPage
          loggedIn={loggedIn}
          isOpen={isOpen}
          closeMenu={closeMenu}
        ></MenuPage>
        <h1 className='title-name'>{titleName}</h1>
        <Outlet location={location}></Outlet>
      </main>
      <Footer location={location}></Footer>
    </>
  );
}
