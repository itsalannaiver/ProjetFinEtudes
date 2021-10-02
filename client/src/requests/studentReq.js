import axios from "axios";
import Cookie from "js-cookie";

const URL = "http://localhost:4000";

export const connectStudent = async (email, password) => {
  const URI = URL + "/users/login";
  let data = {};
  try {
    data = (
      await axios.post(
        URI,
        {
          email,
          password,
        },
        {
          timeout: 1000,
          withCredentials: true,
        }
      )
    ).data;
  } catch (error) {
    if (error.response) {
      Cookie.remove("connect.sid", { path: "" });
      // Request made and server responded
    } else if (error.request) {
      Cookie.remove("connect.sid", { path: "" });
      // The request was made but no response was received
    } else {
      Cookie.remove("connect.sid", { path: "" });
      // Something happened in setting up the request that triggered an Error
    }
  } finally {
    return data;
  }
};

export const getStudentInfo = async () => {
  const uri = URL + "/users/";
  let data;
  try {
    data = (await axios.get(uri, { withCredentials: true })).data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      Cookie.remove("connect.sid", { path: "" });
    } else if (error.request) {
      // The request was made but no response was received

      Cookie.remove("connect.sid", { path: "" });
    } else {
      // Something happened in setting up the request that triggered an Error
      Cookie.remove("connect.sid", { path: "" });
    }
  } finally {
    return data;
  }
};

export const checkLoged =async()=>{
  const URI=URL+'/users/check'
  let data 
  try{
    data =(await axios.get(URI,{withCredentials:true,timeout:1000})).data
  }catch (error) {
    if (error.response) {
      // Request made and server responded
      Cookie.remove("connect.sid", { path: "" });
      data={loged:false}
    } else if (error.request) {
      // The request was made but no response was received

      Cookie.remove("connect.sid", { path: "" });
      data={loged:false}
    } else {
      // Something happened in setting up the request that triggered an Error
      Cookie.remove("connect.sid", { path: "" });
      data={loged:false}
    }
  } finally {
    return data;
  }
}

