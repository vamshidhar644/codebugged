import { UseAuthContext } from './useAuthContext';
import { useSnackbar } from 'notistack';

const Authentication = () => {
  const { dispatch } = UseAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const BACKEND_URL = 'http://localhost:4000';

  const signup = async ({ username, detections }) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        detections,
      }),
    });

    check(response);
  };

  const login = async ({ username, detections }) => {
    const response = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        detections,
      }),
    });

    check(response);
  };

  const check = async (response) => {
    const json = await response.json();

    if (!response.ok) {
      enqueueSnackbar(json.message, {
        variant: 'warning',
        autoHideDuration: 2000,
      });
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      enqueueSnackbar(json.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    }
  };
  return { signup, login };
};

export default Authentication;
