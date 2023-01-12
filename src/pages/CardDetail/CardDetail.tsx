/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import cl from './cardDetail.module.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CardItemsIcons } from '../../components/CardList/CardItemsIcons';


interface PropsForCurrentPost {
  title: string;
  body: string;
  id: number;
  url?: string;
}

export const CardDetail = () => {
  const params = useParams();
  const [currentPost, setCurrentPost] = useState<PropsForCurrentPost>();
  const [currentImg, setCurrentImg] = useState<PropsForCurrentPost>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then(response => response.json())
      .then(json => setCurrentPost(json));
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
      .then(response => response.json())
      .then(json => setCurrentImg(json));
  }, []);

  return (
    <div className={cl.card_detail}>
      <div className={cl.card_bg}>
        <img src={currentImg?.url} alt="" />
      </div>
      <div className={cl.card_wrapper}>
        <div className='container'>
          <div className={cl.card_body}>
            <p>{currentPost?.title}</p>
            <span>{currentPost?.body}</span>
          </div>
          <Link to="/" className={cl.back_btn_link}>
            <div className={cl.back_btn}>
              <CardItemsIcons id='more' />
            </div>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
