import { APIClient } from '../lib/api';
import { useTokens } from './useTokens';

export const useApi = () => {
  const { tokens } = useTokens();
  const api = new APIClient(tokens);

  return api;
};
