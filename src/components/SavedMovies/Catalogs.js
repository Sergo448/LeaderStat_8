import CatalogsList from './CatalogsList/CatalogsList';
import './Catalogs.css';
import { useEffect, useState } from 'react';

export default function Catalogs({
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
      setTitleName('Справочники');
    }, location);


  return (
    <section className="">
      <CatalogsList
      ></CatalogsList>
    </section>
  );
}
