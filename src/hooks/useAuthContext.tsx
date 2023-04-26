import { useContext } from 'react';
import { AuthContext } from '../components/wallet/AuthContext';

export const useAuthContext = () => useContext(AuthContext);
