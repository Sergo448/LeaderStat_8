import './Footer.css';
import { animateScroll as scroll } from 'react-scroll';
import { useEffect, useState } from 'react';

export default function Footer({location}) {

const [isActive, setIsActive] = useState(false);
const windowInnerHeight = document.documentElement.clientHeight;

const setButtonVisible = () => {
  if (window.pageYOffset >= (windowInnerHeight * 0.9)) {
    setIsActive(true);
  } else {
    setIsActive(false);
  }
}

useEffect(() => {
  window.addEventListener('scroll', setButtonVisible);
}, []);

  return (
    <footer className="footer">
      <p className="auth__login-text footer__copyright">LeaderStat 2023</p>
      <div className="footer__container">
        {/* <p className="footer__copyright">&copy; Timonin Igor 2022</p> */}
        <div className="footer__nav">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://leaders2022.innoagency.ru/"
            className="profile__social profile__social_footer app__btn app__btn-opacity"
          >
            Лидеры Цифровой Трансформации
          </a>
          <div
            className={`footer__toTopBtn app__btn-opacity ${
              isActive ? 'footer__toTopBtn_visible' : ''
            }`}
            onClick={() => scroll.scrollToTop()}
          ></div>
        </div>
      </div>
    </footer>
  );
}
