import endPoints from '@services/api';
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

      }
    }
    fetchData();
  }, [endpoint]);
  return data;
};
