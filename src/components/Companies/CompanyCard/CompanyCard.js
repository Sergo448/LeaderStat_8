import { timeToHour } from '../../../utils/utils';
import { baseApiPath } from '../../constants/constants';
import './CompanyCard.css';

export default function CompanyCard({
  company,
  savedCompanyList,
  onClickLike,
  onClickRemove,
  location,
  isLiked,
  ...props
}) {

  // const urlTest = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;

  // function handleDeleteClick() {
  //   onClickRemove(company);
  // }

  // function handleLikeClick() {
  //   if (!isLiked)
  //     onClickLike({
  //       companyId: company.id,
  //       nameRU: company.nameRU,
  //       nameEN: company.nameEN,
  //       country: company.country,
  //       director: company.director,
  //       duration: company.duration,
  //       year: company.year,
  //       description: company.description,
  //       trailerLink: company.trailerLink.match(urlTest)
  //         ? company.trailerLink
  //         : `https://www.youtube.com/results?search_query=${company.nameEN}`,
  //       image: `${baseApiPath}` + `${company.image.url}`,
  //       thumbnail: `${baseApiPath}` + `${company.image.formats.thumbnail.url}`,
  //     });
  //   else {
  //     onClickRemove(savedCompanyList.filter((i) => i.companyId === company.id)[0]);
  //   }
  // }

  return (
    <section className="companyCard">
      <li className="company__item">
        <div className="company__title-container">
          <div className="company__title">
            <h2 className="company__name">{company.nameRU}</h2>
          </div>
          {location === '/companies' ? (
            <button
              className=''
              type="button"
              // onClick={}
            />
          ) : (
            <button
              className="company__bookmark-btn app__btn-opacity company__bookmark-btn_del"
              type="button"
              // onClick={}
            />
          )}
        </div>
        <a
          className="app__btn-opacity company__img-link"
          target="_blank"
          rel="noreferrer"
          href='#'
        >
          <img
            className="company__img"
            src={company.image}
            alt='логотип компании'
          />
        </a>
      </li>
    </section>
  );
}
