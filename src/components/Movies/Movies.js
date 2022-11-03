import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

export default function Movies({
  location,
  message,
  setMessage,
  setTitleName,
  ...props
}) {

  useEffect(() => {
    setTitleName('Все проекты');
  }, location);

  return (
    <section className="movies movies__container">
    </section>
  );
}
