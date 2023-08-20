import { useReducer, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { State } from '../interface/useDataFetchInterface.type';
import dataFetchReducer from './dataFetchReducer';


const useDataFetch = <T>(url: AxiosRequestConfig['url'], params?: AxiosRequestConfig['params'], token?: string, headers?: AxiosRequestConfig['headers']): State<T> => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: null,
    isLoading: false,
    error: null,
    messageSucess: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const config: AxiosRequestConfig = {
          params,
          headers: {},
        };

        if (token) {
            config.headers = { 'Authorization': `Bearer ${token}` };
        }

        if (headers) {
          config.headers = headers
        }

        if (url) {
          const response = await axios.get(url, config)
          
          if (response.status === 500) {
            throw new Error('Server error. Please try again later.')
          } else if (response.status !== 200) {
            let errorMessage = `Erreur HTTP ${response.status}`
            if (response.status === 401) {
              errorMessage = 'Not authorized. Please login.'
            } else if (response.status === 404) {
              errorMessage = 'Not found.'
            }
  
            throw new Error(errorMessage)
          }
  
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          dispatch({ type: 'SET_MESSAGE', payload: 'Data successfully recovered !' })
        }

      } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'An error has occurred.' });
        }
      }
    };

    fetchData();
  }, []);

  return state as State<T>;
}

export default useDataFetch;