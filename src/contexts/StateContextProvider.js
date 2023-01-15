import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/search';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      params: {
        query: 'word cup',
        gl: 'us',
        lr: 'en',
        num: '10',
        start: '0',
        sort: 'relevance',
      },
      headers: {
        'X-RapidAPI-Key': '3123c9dbebmsh82f554885b7357cp15aae8jsn8d489635920e',
        'X-RapidAPI-Host': 'google-search72.p.rapidapi.com',
      },
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
