const SECONDS_API = import.meta.env.VITE_API_URL;

// create user from firebase
export async function createUser(credentials) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    };
    const res = await fetch(`${SECONDS_API}/users`, options);
    const newUser = await res.json();
    return newUser;
  } catch (error) {
    throw error;
  }
}