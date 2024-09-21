import { useEffect, useState, useReducer } from 'react'

const useApi = ({
    url, method = "GET", headers = {}, body = null, ignored = null, nullish = false,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, forceUpdate] = useReducer((x) => x + 1, 0);

  // Check for nullish check 
  if(nullish) {
    return { data: null, error: null, loading: false, forceUpdate };
  }
  
  // Check that body params are truthy
  const checkPropertiesTruly = () => {
    if(!body) return true;
    return Object.values(body).every(item => item);
  }

  // Api call using fetch
  useEffect(() => {
    const fetchData = async () => {
        try {
            if(!checkPropertiesTruly()) return;
          
            const request = await fetch(url, {
                method: method,
                headers: {
                    ...headers
                },
                body: body ? JSON.stringify(body) : null
            });

            const responseApi = await request.json();
            setData(responseApi);
        } catch (error) {      
            setError(error);
            console.debug(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [url, method, refresh, checkPropertiesTruly()]);

  //States object return
  return { data, error, loading, forceUpdate }
};

export default useApi;