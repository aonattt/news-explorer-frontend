// Stage 1 stub: simulates the backend auth endpoints until Stage 2 is built.
const TOKEN_KEY = "jwt";
const USER_KEY = "news-explorer-user";
const FAKE_TOKEN = "a-fake-token";

const delay = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 300));

export function register({ email, name }) {
  const user = { email, name, _id: "fake-user-id" };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return delay(user);
}

export function authorize({ email }) {
  const stored = JSON.parse(localStorage.getItem(USER_KEY) || "null");
  const name = stored?.email === email ? stored.name : email.split("@")[0];
  localStorage.setItem(USER_KEY, JSON.stringify({ ...stored, email, name }));
  return delay({ token: FAKE_TOKEN });
}

export function checkToken(token) {
  if (token !== FAKE_TOKEN) {
    return Promise.reject(new Error("Invalid token"));
  }
  const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
  return user ? delay(user) : Promise.reject(new Error("User not found"));
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
