import { UseAuthContext } from './useAuthContext';
import { useSnackbar } from 'notistack';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });

    enqueueSnackbar('Logged out!', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  return { logout };
};
