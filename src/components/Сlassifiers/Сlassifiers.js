import './Сlassifiers.css';
import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import TableCell from '../Table/Table-cell/Table-cell';

export default function Сlassifiers({
  location,
  isLoading,
  setIsLoading,
  isSearchEnd,
  setIsSearchEnd,
  message,
  setMessage,
  setTitleName,
  ...props
}) {
  useEffect(() => {
    setTitleName('Классификаторы');
  }, [location]);

  const [selectedSPGZFile, setSelectedSPGZFile] = useState(null);
  const [selectedKPGZFile, setSelectedKPGZFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [docName, setDocName] = useState('');
  const hostUrl = 'http://localhost:3005/upload';

  // const hostUrl = 'https://hackathon-leader-stat.vercel.app/upload';

  const handleSPGZChange = (event) => {
    setSelectedSPGZFile(event.target.files[0]);
  };

  const handleKPGZChange = (event) => {
    setSelectedKPGZFile(event.target.files[0]);
  };

  const handleDelDoc = (event) => {
    console.log(event.target);
  };

  const handleSPGZUpload = async (file) => {
    if (!file) {
      alert('Выберите файл для загрузки');
      return;
    }

    const SPGZData = new FormData();
    SPGZData.append('docs', selectedSPGZFile);

    const res = await fetch(hostUrl, { method: 'POST', body: SPGZData });

    const data = await res.json();
    setUploaded(data);
    console.log(data);
  };

  const handleKPGZUpload = async (file) => {
    if (!file) {
      alert('Выберите файл для загрузки');
      return;
    }
    const KPGZData = new FormData();
    KPGZData.append('docs', selectedKPGZFile);

    const res = await fetch(hostUrl, { method: 'POST', body: KPGZData });

    const data = await res.json();
    setUploaded(data);
    console.log(data);
  };

  const toKb = (number) => {
    return Math.round(number / 1024);
  };

  const { id, kpgz, spgzItem, unit, okpd, okpd2 } = document;

  return (
    <>
      <div className="table__wrapper"></div>
      <Table
        tableRowClass="table__row"
        tableHeaderClass="table__row--header"
        tableCellClass="table__cell"
        headerArr={[
          'ID',
          'КПГЗ',
          'Наименование CПГЗ',
          'Ед. измерения',
          'ОКПД',
          'ОКПД 2',
        ]}
      >
        <div className="table__row">
          <TableCell item={id} />
          <TableCell item={kpgz} />
          <TableCell item={spgzItem} />
          <TableCell item={unit} />
          <TableCell item={okpd} />
          <TableCell item={okpd2} />
        </div>
      </Table>
      <div className="classifier__container">
        <div className="classifiers__wrapper">
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__spgz-file"
              accept=".xls, .xlsx"
              onChange={handleSPGZChange}
            />
            <label className="catalog__label" htmlFor="input__spgz-file">
              + Добавить СПГЗ
            </label>
          </div>
          <button
            className="catalog__btn catalog__submit app__btn-opacity"
            onClick={handleSPGZUpload}
          >
            Загрузить СПГЗ
          </button>
          <div className="catalog__docs-to-add catalog__spgz">
            {selectedSPGZFile && (
              <div className="catalog__docs-wrapper">
                <img
                  className="catalog__list-logo app__btn-opacity"
                  src={require('../../images/doc.jpg')}
                  alt="docs logo"
                ></img>
                <span className="catalog__docs-text">
                  Имя файла: {selectedSPGZFile.name}
                </span>
                <span className="catalog__docs-text">
                  Размер: {toKb(selectedSPGZFile.size)} Кб
                </span>
              </div>
            )}
          </div>
          <div className="catalog__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__kpgz-file"
              accept=".xls, .xlsx"
              onChange={handleKPGZChange}
            />
            <label className="catalog__label" htmlFor="input__kpgz-file">
              + Добавить КПГЗ
            </label>
          </div>
          <button
            className="catalog__btn catalog__submit app__btn-opacity"
            onClick={handleKPGZUpload}
          >
            Загрузить КПГЗ
          </button>
          <div className="catalog__docs-to-add catalog__kpgz">
            {selectedKPGZFile && (
              <div className="catalog__docs-wrapper">
                <img
                  className="catalog__list-logo app__btn-opacity"
                  src={require('../../images/doc.jpg')}
                  alt="docs logo"
                ></img>
                <span className="catalog__docs-text">
                  Имя файла: {selectedKPGZFile.name}
                </span>
                <span className="catalog__docs-text">
                  Размер: {toKb(selectedKPGZFile.size)} Кб
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
