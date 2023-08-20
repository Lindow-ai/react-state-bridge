export interface State<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  messageSucess: string | null;
}