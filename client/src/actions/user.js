import { toast } from "react-toastify";
import fetchData from "./utils/fetchData";

const url = import.meta.env.VITE_SERVER_URL + '/user';

export const googleRegister = async(user,token,dispatch) => {
  const result = await fetchData({
    url:url+'/google-register',body:user,dispatch
  })

  if(result){
    dispatch({type:'UPDATE_USER',payload:{...result,token}})
    toast.success('Signed in successfully!');
  }
} 

export const logout = (dispatch) => {
  dispatch({ type: 'UPDATE_USER', payload: null });
  
};