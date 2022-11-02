import CompaniesCardList from '../Companies/CompaniesCardList/CompaniesCardList';
import Company from '../Companies/Company';
import './Main.css';


export default function Main({ setTitleName,
  // savedCompaniesList,
  ...props }) {

    const savedCompaniesList = [];
    const isLoading = false;

  return (
    <div className="main">
      <Company
        savedCompaniesList={savedCompaniesList}
        isLoading={isLoading}
        setTitleName={setTitleName}
      ></Company>
    </div>
  );
}
