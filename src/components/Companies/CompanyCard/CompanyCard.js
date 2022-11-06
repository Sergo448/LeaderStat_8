import './CompanyCard.css';

export default function CompanyCard({
  company,
  savedCompanyList,
  location,
  isLiked,
  ...props
}) {

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
