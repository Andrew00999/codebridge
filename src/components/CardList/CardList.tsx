/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from 'react'
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
  const [filteredList, setFilteredList] = useState([]);

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
      setFilteredList(filteredCards)
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchQuery, post])

  // highlight text function
  const Hightlight = (props: any) => {
    const { filter, str } = props
    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)

    if (matchValue) {

      return str.split(regexp).map((s: any, index: any, array: any) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return <>{s}<span className={cl.highlight}>{c}</span></>
        }
        return s
      })
    }
    return str
  }

  const light = useCallback((str: any) => {
    return <Hightlight filter={searchQuery} str={str} />
  }, [searchQuery])

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
      <p className={cl.result}>Results: {filteredList.length}</p>
      {filteredList.length ? (
        <div className={cl.list}>
          {filteredList.map((item: ListTypes) => (
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
                  <p>{light(item.title)}</p>
                  <span>{light(item.body.slice(0, 100) + "...")}</span>
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
      ) : (
        <h2>Sorry, no matches :(</h2>
      )}
    </>
  )
}
