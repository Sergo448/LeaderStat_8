import Preloader from '../Preloader/Preloader';
import './CompaniesCardList.css';

export default function CompaniesCardList({
  companies,
  moreBtnActive,
  offsetChanger,
  isLoading,
  message,
  setMessage,
  ...props
}) {


  return (
    <section className="companiesCardList">
      <div className="companiesCardList__container">
        <ul className="companyCardList__gallery">{props.children}</ul>
        <Preloader isLoading={isLoading}></Preloader>
        <p className="companiesCardList__not-found">
          {message}
        </p>
        <div className="companiesCardList__more">
          <button
            className={`companiesCardList_more-btn app__btn-opacity ${
              moreBtnActive ? '' : 'block__hide'
            }`}
            onClick={offsetChanger}
          >
            Ещё
          </button>
        </div>
      </div>
    </section>
  );
}
