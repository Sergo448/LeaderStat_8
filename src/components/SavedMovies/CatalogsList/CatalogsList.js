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

const [selectedSNFile, setSelectedSNFile] = useState(null);
const [selectedTSNFile, setSelectedTSNFile] = useState(null);
const [uploaded, setUploaded] = useState(null);
const [docName, setDocName] = useState('');
// const hostUrl = 'http://localhost:3005/upload';

const hostUrl = 'https://hackathon-leader-stat.vercel.app/upload';

const handleSNChange = (event) => {
  setSelectedSNFile(event.target.files[0])
}

const handleTSNChange = (event) => {
  setSelectedTSNFile(event.target.files[0]);
};

const handleDelDoc = (event) => {
  console.log(event.target);
  // if ()
  // setSelectedSNFile();
};

const handleSNUpload = async (file) => {
  if (!file) {
    alert('Выберите файл для загрузки');
    return;
  };

  const SNData = new FormData();
  SNData.append('docs', selectedSNFile);

  const res = await fetch(hostUrl, { method: 'POST', body: SNData });

    const data = await res.json();
    setUploaded(data);
    console.log(data);
};

const handleTSNUpload = async (file) => {
  if (!file) {
    alert('Выберите файл для загрузки');
    return;
  }

  const TSNData = new FormData();
  TSNData.append('docs', selectedTSNFile);

  const res = await fetch(hostUrl, { method: 'POST', body: TSNData });

  const data = await res.json();
  setUploaded(data);
  console.log(data);
};

const toKb = (number) => {
  return Math.round(number/1024);
};

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
              accept=".xls, .xlsx"
              onChange={handleSNChange}
            />
            <label className="catalog__label" htmlFor="input__sn-file">
              + Добавить файл СН
            </label>
          </div>
          {/* <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__sn-archive"
              accept=".xls, .xlsx"
            />
            <label className="catalog__label" htmlFor="input__sn-archive">
              + Добавить из Архива
            </label>
          </div> */}
          <button
            className="catalog__btn catalog__submit app__btn-opacity"
            onClick={handleSNUpload}
          >
            Загрузить
          </button>
          <div className="catalog__docs-to-add catalog__sn">
            {selectedSNFile && (
              <div className="catalog__docs-wrapper">
                <img
                  className="catalog__list-logo app__btn-opacity"
                  src={require('../../../images/doc.jpg')}
                  alt="docs logo"
                  onClick={handleDelDoc}
                ></img>
                <span className="catalog__docs-text">
                  Имя файла: {selectedSNFile.name}
                </span>
                <span className="catalog__docs-text">
                  Размер: {toKb(selectedSNFile.size)} Кб
                </span>
              </div>
            )}
          </div>
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__tsn-file"
              accept=".xls, .xlsx"
              onChange={handleTSNChange}
            />
            <label className="catalog__label" htmlFor="input__tsn-file">
              + Добавить файл ТСН
            </label>
          </div>
          <button
            className="catalog__btn catalog__submit app__btn-opacity"
            onClick={handleTSNUpload}
          >
            Загрузить
          </button>
          {/* <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__tsn-archive"
            />
            <label className="catalog__label" htmlFor="input__tsn-archive">
              + Добавить из Архива
            </label>
          </div> */}
          <div className="catalog__docs-to-add catalog__tsn">
            {selectedTSNFile && (
              <div className="catalog__docs-wrapper">
                <img
                  className="catalog__list-logo app__btn-opacity"
                  src={require('../../../images/doc.jpg')}
                  alt="docs logo"
                ></img>
                <span className="catalog__docs-text">
                  Имя файла: {selectedTSNFile.name}
                </span>
                <span className="catalog__docs-text">
                  Размер: {toKb(selectedTSNFile.size)} Кб
                </span>
              </div>
            )}
          </div>
          {/* <button
            className="catalog__btn catalog__submit app__btn-opacity"
            onClick={handleSNUpload}
          >
            Загрузить
          </button> */}
        </div>
        <div className="catalog__uploaded">
          <ul className="catalog__list">
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
