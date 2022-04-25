import Axios from "axios";

export function validateEmail(str: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
}

export async function isAuthenticated() {
  const { VITE_FM_API_URL } = import.meta.env;
  const url: string = `${VITE_FM_API_URL}/token/valid`;

  const userStorageData = getUserToken();
  if (!userStorageData) return false;
  if (!userStorageData.token) return false;

  try {
    let data = await Axios.get(url, {
      headers: { Authorization: `Bearer ${userStorageData.token}` },
    });
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (e: unknown) {
    return false;
  }
}

export function getUserToken() {
  const userStorage = localStorage.getItem("FMUserAuth") as string;
  if (!userStorage) return null;
  return JSON.parse(userStorage);
}

export function getUserInfo() {}
