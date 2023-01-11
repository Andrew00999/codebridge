import React from 'react'
import cl from './form.module.scss';
import { FormSearch } from './FormSearch';

export const Form: React.FC = () => {
  return (
    <form className={cl.form}>
      <label className={cl.form_label}>
        <span>Filter by keywords</span>
        <div className={cl.search_wrapper}>
          <div className={cl.search_icon}>
            <FormSearch id="search" />
          </div>
          <input className={cl.search_input} type="text" placeholder='The most successful IT companies in 2020' />
        </div>
      </label>
    </form>
  )
}
