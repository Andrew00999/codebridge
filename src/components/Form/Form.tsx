import React from 'react'
import cl from './form.module.scss';
import { FormSearch } from './FormSearch';
import { useMainContext } from '../../context/MainContext';

export const Form: React.FC = () => {
  const { searchQuery, setSearchQuery } = useMainContext();

  return (
    <form className={cl.form} onSubmit={e => e.preventDefault()}>
      <label className={cl.form_label}>
        <span>Filter by keywords</span>
        <div className={cl.search_wrapper}>
          <div className={cl.search_icon}>
            <FormSearch id="search" />
          </div>
          <input
            className={cl.search_input}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            placeholder='The most successful IT companies in 2020'
          />
        </div>
      </label>
    </form>
  )
}
