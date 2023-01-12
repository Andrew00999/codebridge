import React from 'react';
import CardList from '../../components/CardList';
import Form from '../../components/Form';
import cl from './home.module.scss';

export const Home = () => {
  return (
    <div className='container'>
      <div className={cl.home}>
        <Form />
        <CardList />
      </div>
    </div>
  )
}
