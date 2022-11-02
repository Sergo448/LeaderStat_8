import './Company.css';
import CompanyCard from './CompanyCard/CompanyCard';
import CompaniesCardList from './CompaniesCardList/CompaniesCardList';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Company({
  getCompanies,
  companiesList,
  setCompaniesList,
  loggedIn,
  isLoading,
  setIsLoading,
  location,
  savedCompaniesList,
  onClickLike,
  onClickRemove,
  isSearchEnd,
  setIsSearchEnd,
  message,
  setMessage,
  setTitleName,
  ...props
}) {
  const [filtredCompaniesList, setFiltredCompaniesList] = useState([]);
  const [limit, setLimit] = useState(12);
  const [rowSize, setRowSize] = useState(3);
  const [offset, setOffset] = useState(limit);
  const [moreBtnActive, setMoreBtnActive] = useState(false);
  const nav = useNavigate();

  // изменяем кол-во отображаемых карточек для кнопки 'Ещё'
  function offsetChanger() {
    if (offset <= limit) {
      setOffset(limit + rowSize);
    } else if (limit < offset < filtredCompaniesList.length) {
      setOffset(offset + rowSize);
    }
  }

  function offsetReset() {
    setOffset(limit);
  }

  useEffect(() => {
    setOffset(limit);
  }, [limit]);

    useEffect(() => {
      setTitleName('Компании');
    }, location);

  // выбираем кол-во отображаемых карточек в зависимости от ширины экрана
  function windowWidthChecker() {
    if (window.innerWidth >= 1280) {
      setLimit(12);
      setRowSize(3);
    } else if (window.innerWidth >= 768) {
      setLimit(8);
      setRowSize(2);
    } else if (window.innerWidth < 768) {
      setLimit(5);
      setRowSize(2);
    }
  }

  //отслеживаем изменение ширины экрана каждые 2сек
  useEffect(() => {
    let resizeTimeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(windowWidthChecker, 2000);
    });

    window.removeEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(windowWidthChecker, 2000);
    });
  }, []);

  useEffect(() => {
    filtredCompaniesList.length > offset
      ? setMoreBtnActive(true)
      : setMoreBtnActive(false);
  }, [filtredCompaniesList, offset]);

  function getSavedCompanyCard(arr, company) {
    return arr.find((item) => {
      return item.companyId === (company.id || company.companyId);
    });
  }

  // useEffect(() => {
  //   if (isSearchEnd && filtredCompaniesList.length === 0) {
  //     setMessage('Ничего не найдено');
  //   } else {
  //     setMessage('');
  //   }
  // }, [companiesList, filtredCompaniesList]);

  return (
    <section className="company company__container">
      <CompaniesCardList
        isLoading={isLoading}
        moreBtnActive={moreBtnActive}
        offsetChanger={offsetChanger}
        message={message}
        // setMessage={setMessage}
      >
        {savedCompaniesList.length > 0 ? (
          filtredCompaniesList
            .slice(0, offset)
            .map((company) => (
              <CompanyCard
                company={company}
                key={company.id}
                location={location}
                savedCompaniesList={savedCompaniesList}
                onClickLike={onClickLike}
                onClickRemove={onClickRemove}
              />
            ))
        ) : (
          <>
            <div className="noCompany__wrapper">
              <p className="noCompany__title">У вас ещё нет компаний</p>
              <p className="noCompany__text">
                В компании выполняется работа с проектами, происходит общение
                между участниками, ведётся отчётность
              </p>
              <button className="main__btn addCompany__btn app__btn-opacity">
                Создать компанию
              </button>
            </div>
          </>
        )}
      </CompaniesCardList>
    </section>
  );
}