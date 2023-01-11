import React from 'react'
import cl from './cardItem.module.scss';

interface Props {
  children: JSX.Element|JSX.Element[];
}

export const CardItem = ({ children }: Props) => {
  return (
    <div className={cl.card_item}>{children}</div>
  )
}
