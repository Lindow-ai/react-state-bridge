import { useReducer, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { State } from '../interface/useDataFetchInterface.type';
import dataFetchReducer from './dataFetchReducer';


const useDataFetch = <T>(url: string, params?: AxiosRequestConfig['params'], token?: string): State<T> => {
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

        const response = await axios.get(url, config);

        if (response.status === 500) {
          throw new Error('Erreur serveur. Veuillez réessayer ultérieurement.');
        } else if (response.status !== 200) {
          let errorMessage = `Erreur HTTP ${response.status}`;
          if (response.status === 401) {
            errorMessage = 'Non autorisé. Veuillez vous connecter.';
          } else if (response.status === 404) {
            errorMessage = 'Ressource non trouvée.';
          }

          throw new Error(errorMessage);
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Données récupérées avec succès !' });

      } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Une erreur est survenue.' });
        }
      }
    };

    fetchData();
  }, []);

  return state as State<T>;
}

export default useDataFetch;