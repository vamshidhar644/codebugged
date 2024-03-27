import { UseAuthContext } from './useAuthContext';

const Authentication = () => {
  const { dispatch } = UseAuthContext();

  const BACKEND_URL = 'http://localhost:4000';

  const signup = async ({ username, faceImg }) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        username,
        faceImg,
      }),
    });

    check(response);
  };

  const login = async ({ username, faceImg }) => {
    const response = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        username,
        faceImg,
      }),
    });

    check(response);
  };

  const check = async (response) => {
    const json = await response.json();

    if (!response.ok) {
      console.log(json.message);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    }
  };
  return { signup, login };
};

export default Authentication;
