/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import CardItem from '../CardItem';
import { CardItemsIcons } from './CardItemsIcons';
import cl from './cardList.module.scss';
import { useMainContext } from '../../context/MainContext';

import { Link } from 'react-router-dom';

interface ListTypes {
  title: string;
  body: string;
  id: number;
  url?: string;
}


export const CardList: React.FC = () => {
  const { post, setPost, preview, setPreview, searchQuery } = useMainContext();
  const [filteredValue, setFilteredValue] = useState([]);

  // filter function
  const filterCards = (searchText: string, listOfCards: []) => {
    if (!searchText) {
      return listOfCards
    }
    return (
      listOfCards.filter(({ title }: any): string =>
        title.toLowerCase().includes(searchText.toLowerCase())
      ),
      listOfCards.filter(({ body }: any): string =>
        body.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  }

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredCards = filterCards(searchQuery, post);
      setFilteredValue(filteredCards)
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchQuery, post])

  // get posts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => response.json())
      .then(json => setPost(json));
  }, []);

  // get pictures
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => response.json())
      .then(json => setPreview(json));
  }, []);

  return (
    <>
      <p className={cl.result}>Results: {filteredValue.length}</p>
      <div className={cl.list}>
        {filteredValue.map((item: ListTypes) => (
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
