import { useEffect, useState } from "react";
import { getData } from "../api/commonServices";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const {data}  = await getData(url);
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getPost();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
