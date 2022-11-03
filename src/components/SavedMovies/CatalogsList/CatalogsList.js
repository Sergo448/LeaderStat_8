import { useState } from 'react';
import Preloader from '../../Movies/Preloader/Preloader';
import './CatalogsList.css';

export default function CatalogsList({
  isLoading,
  location,
  message,
  setMessage,
  ...props
}) {

const [docName, setDocName] = useState('')

  return (
    <>
      <Preloader isLoading={isLoading}></Preloader>
      <div className="catalog__container">
        <div className="catalog__wrapper">
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__sn-file"
            />
            <label className="catalog__label" htmlFor="input__sn-file">
              + Добавить файл СН
            </label>
          </div>
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__sn-archive"
            />
            <label className="catalog__label" htmlFor="input__sn-archive">
              + Добавить из Архива
            </label>
          </div>
          <div className="catalog__docs-to-add"></div>
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__tsn-file"
            />
            <label className="catalog__label" htmlFor="input__tsn-file">
              + Добавить файл ТСН
            </label>
          </div>
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__tsn-archive"
            />
            <label className="catalog__label" htmlFor="input__tsn-archive">
              + Добавить из Архива
            </label>
          </div>
          <div className="catalog__docs-to-add"></div>
          <button className="catalog__btn catalog__submit app__btn-opacity">
            Загрузить
          </button>
        </div>
        <div className="catalog__uploaded">
          <ul className="catalog__list">
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span>{docName ? docName : 'Загруженный документ'}</span>
            </li>
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span>{docName ? docName : 'Загруженный документ'}</span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span>{docName ? docName : 'Загруженный документ'}</span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span>{docName ? docName : 'Загруженный документ'}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
