import axios from 'axios';

const { useState, useEffect } = require('react');

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [endpoint]);
  return data;
};
