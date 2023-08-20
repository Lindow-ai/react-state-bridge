import { State } from "../interface/useDataFetchInterface.type";
import { Action } from "../type/useDataFetchType";

const dataFetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, isLoading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, isLoading: false, data: action.payload};
      case 'FETCH_FAILURE':
        return { ...state, isLoading: false, error: action.payload };
      case 'SET_MESSAGE':
      return { ...state, messageSucess: action.payload };
      default:
        return state
    }
  };

export default dataFetchReducer