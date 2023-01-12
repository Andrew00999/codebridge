/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import CardItem from '../CardItem';
import { CardItemsIcons } from './CardItemsIcons';
import cl from './cardList.module.scss';

import { Link } from 'react-router-dom';

interface ListTypes {
  title: string;
  body: string;
  id: number;
  url?: string;
}

export const CardList: React.FC = () => {
  const [post, setPost] = useState([]);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => response.json())
      .then(json => setPost(json));
  }, []);

  // useEffect(() => {
  //   post.map((item: ListTypes) => console.log(item.title))
  // }, [post]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => response.json())
      .then(json => setPreview(json));
  }, []);

  return (
    <>
      <p className={cl.result}>Results:</p>
      <div className={cl.list}>
        {post.map((item: ListTypes) => (
          <CardItem
            key={item.id}
          >
            {preview.map((prev: ListTypes) => (
              (prev.id === item.id) && (
                <img className={cl.item_img} key={prev.id} src={prev?.url} alt="" />
              )
            ))}
            <div className={cl.item_content}>
              <div className={cl.item_content_top}>
                <p>{item.title}</p>
                <span>{`${item.body.slice(0, 100)}...`}</span>
              </div>
              <Link
                to={`/details/${item.id}`}
                className={cl.read_more}
              >
                <p>Read more</p>
                <CardItemsIcons id="more" />
              </Link>
            </div>
          </CardItem>
        ))}
      </div>
    </>
  )
}
