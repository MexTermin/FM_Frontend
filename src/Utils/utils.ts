import Axios from "axios";

const { VITE_FM_API_URL } = import.meta.env;

export function validateEmail(str: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
}

export async function isAuthenticated() {
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

export async function getUserInfo() {
  const url: string = `${VITE_FM_API_URL}/user/token`;
  const userStorageData = getUserToken();

  try {
    let data = await Axios.get(url, {
      headers: { Authorization: `Bearer ${userStorageData.token}` },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (e: unknown) {
    return null;
  }
}

export function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("es-ES", {
    month: "long",
  });
}
