import { toast } from "react-toastify";
import { logout } from "../user";

const fetchData = async (
  { url, method='POST', token = '', body = null },
  dispatch
) => {
  const headers = token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
  body = body ? { body: JSON.stringify(body) } : {}

  try {
    const response = await fetch(url, { method, headers, ...body })
    const data = await response.json()
    if (!data.success) {
      if (response.status === 401) logout(dispatch)
      throw new Error(data.message);
    }
    return data.result;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
    return null;
  }
}

export default fetchData;