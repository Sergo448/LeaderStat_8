import './Estimate.css';
import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import TableCell from '../Table/Table-cell/Table-cell';

export default function Estimate({
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
    setTitleName('Сметы');
  }, [location]);

  const [selectedEstimateFile, setSelectedEstimateFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [docName, setDocName] = useState('');
  const hostUrl = 'http://localhost:3005/upload';

  // const hostUrl = 'https://hackathon-leader-stat.vercel.app/upload';

  const handleEstimateChange = (event) => {
    setSelectedEstimateFile(event.target.files[0]);
  };

  const handleDelDoc = (event) => {
    console.log(event.target);
  };

  const handleEstimateUpload = async (file) => {
    if (!file) {
      alert('Выберите файл для загрузки');
      return;
    }

    const estimateData = new FormData();
    estimateData.append('docs', selectedEstimateFile);

    const res = await fetch(hostUrl, { method: 'POST', body: estimateData });

    const data = await res.json();
    setUploaded(data);
    console.log(data);
  };

  const toKb = (number) => {
    return Math.round(number / 1024);
  };

  const { a, b, c, d, e, f, g, h, k, l , m , n } = document;

  return (
    <>
      <div className="estimate__container">
        <div className="estimate__table-wrapper">
          <Table
            tableRowClass="table__row_estimate"
            tableHeaderClass="table__row--header_estimate"
            tableCellClass=" table__cell_estimate"
            headerArr={[
              '№',
              'Шифр расценки и коды ресурсов',
              'Наименование работ и затрат',
              'Ед. измерения',
              'Кол-во единиц',
              'Цена на ед. изм. руб.',
              'Попра-вочные коэфф.',
              'Коэфф. зимних удоро-жаний',
              'Коэфф. пересчета',
              'ВСЕГО затрат, руб.',
              'ЗТР, всего чел.-час',
              'Ст-ть ед. с начислен.',
            ]}
          >
            <div className="table__row_estimate">
              <TableCell item={a} />
              <TableCell item={b} />
              <TableCell item={c} />
              <TableCell item={d} />
              <TableCell item={e} />
              <TableCell item={f} />
              <TableCell item={g} />
              <TableCell item={h} />
              <TableCell item={k} />
              <TableCell item={l} />
              <TableCell item={m} />
              <TableCell item={n} />
            </div>
          </Table>
        </div>
        <div className="estimate__wrapper">
          <div className="estimate__btn catalog__add-document app__btn-opacity">
            <input
              className="catalog__input-hide"
              type="file"
              name="file"
              id="input__estimate-file"
              accept=".xls, .xlsx"
              onChange={handleEstimateChange}
            />
            <label className="catalog__label" htmlFor="input__estimate-file">
              + Добавить файл сметы
            </label>
          </div>
          <button
            className="estimate__btn estimate__submit app__btn-opacity"
            onClick={handleEstimateUpload}
          >
            Загрузить смету
          </button>
          <div className="catalog__docs-to-add catalog__estimate">
            {selectedEstimateFile && (
              <div className="catalog__docs-wrapper">
                <img
                  className="catalog__list-logo app__btn-opacity"
                  src={require('../../images/doc.jpg')}
                  alt="docs logo"
                  onClick={handleDelDoc}
                ></img>
                <span className="catalog__docs-text">
                  Имя файла: {selectedEstimateFile.name}
                </span>
                <span className="catalog__docs-text">
                  Размер: {toKb(selectedEstimateFile.size)} Кб
                </span>
              </div>
            )}
          </div>
        </div>
        {/* <div className="catalog__uploaded">
          <ul className="catalog__list">
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>{' '}
            <li className="catalog__list-item">
              <img
                className="catalog__list-logo"
                src={require('../../images/doc.jpg')}
                alt="docs logo"
              ></img>
              <span className="catalog__docs-text">
                {docName ? docName : 'Загруженный документ'}
              </span>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
