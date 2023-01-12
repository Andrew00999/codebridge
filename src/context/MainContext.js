/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [post, setPost] = useState([]);
  const [preview, setPreview] = useState([]);

  return (
    <Context.Provider
      value={{
        setSearchQuery,
        searchQuery,
        post,
        setPost,
        preview,
        setPreview,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMainContext = () => useContext(Context);
