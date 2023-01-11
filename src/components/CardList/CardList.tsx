import React, { useEffect, useState } from 'react'
import CardItem from '../CardItem';
import { CardItemsIcons } from './CardItemsIcons';
import cl from './cardList.module.scss';

import { Link } from 'react-router-dom';

interface ListTypes {
  title: any;
  id: number;
}

export const CardList: React.FC = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => response.json())
      .then(json => setPost(json));
  }, []);

  return (
    <>
      <p className={cl.result}>Results:</p>
      <div className={cl.list}>
        {post.map((item: ListTypes) => (
          <CardItem
            key={item.id}
          >
            {item.title}
            <Link
              to={`/details/${item.id}`}
              className={cl.read_more}
            >
              <p>Read more</p>
              <CardItemsIcons id="more" />
            </Link>
          </CardItem>
        ))}
      </div>
    </>
  )
}
