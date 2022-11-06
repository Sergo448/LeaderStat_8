import './CompaniesCardList.css';

export default function CompaniesCardList({
  companies,
  isLoading,
  message,
  setMessage,
  ...props
}) {


  return (
    <section className="companiesCardList">
      <div className="companiesCardList__container">
        <ul className="companyCardList__gallery">{props.children}</ul>
        <p className="companiesCardList__not-found">
          {message}
        </p>
      </div>
    </section>
  );
}
