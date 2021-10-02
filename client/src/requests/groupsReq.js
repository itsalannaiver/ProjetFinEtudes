import axios from "axios";
import Cookie from "js-cookie";
import fileDownload from 'js-file-download';

const URL = "http://localhost:4000";

// Get modules
export const getModules = async () => {
  const URI = URL + "/groups/modules";
  let data = {};
  try {
    data = (await axios.get(URI, { timeout: 1000, withCredentials: true }))
      .data;
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

// Get Exercices
export const getExercices = async (idMod) => {
  const URI = URL + "/exercise/" + idMod;
  let data = {};
  try {
    data = (await axios.get(URI, { timeout: 1000, withCredentials: true })).data;
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

// Get One Exercise Info
export const getOneExercise = async(idExo)=>{
  const URI = URL +"/exercise/one/"+idExo;
  let data={};
  try {
    data = (await axios.get(URI, { timeout: 1000, withCredentials: true })).data;
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
}

// Post An Exam
export const postExam =async(idExo,response)=>{
  const URI= URL + "/exercise/submit";
  let data={}
  try {
    data =(await axios.post(URI,{
      "exam":idExo,
      "answers":response
    },{
      timeout:1000,
      withCredentials:true
    })).data
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
}

// Add An exercise 
export const addNewExerciceToModule=async({mod,nom,description,questions,exam,duration})=>{
  const URI = URL + "/exercise/create"
  let data={}
  try{
    data=(await axios.post(URI,{
      "nom":nom,
      "description":description,
      "questions":questions,
      "exam":exam,
      "duration":duration,
      "module":mod
    },{
      timeout:2000,
      withCredentials:true
    })).data
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

}

// Remove/Delete Exercise
export const removeExercise=async(idExo)=>{
  const URI= URL+'/exercise/'+idExo
  let data={}
  try{
    data=(await axios.delete(URI,{timeout:2000,withCredentials:true})).data
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
}

//Retrieve Cours List 
export const getAllCours=async(idMod)=>{
  const URI= URL +'/course/'+idMod
  let data={}
  try{
    data=(await axios.get(URI,{timeout:2000,withCredentials:true})).data
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
}

// Download Course
export const downloadCour=async(idFile,fileName,extName)=>{
  const URI = URL +'/course/download/'+idFile
  try{
    let data =(await axios.get(URI,{timeout:2000,withCredentials:true,responseType:'blob'})).data
    fileDownload(data,fileName+extName)
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
  }
}
//Upload Course
export const uploadCour=async(cours,nom,description,module)=>{
  const URI=URL+'/course/create'
  let data 
  try{
    const formData=new FormData();
    formData.append('cours',cours)
    formData.append('nom',nom)
    formData.append('description',description)
    formData.append('module',module)
    data=(await axios.post(URI,formData,{timeout:2000,withCredentials:true,Headers:{
      'content-type': 'multipart/form-data'
    }})).data
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
}

// Delete Cours
export const deleteCours=async(idCours)=>{
  const URI=URL+'/course/'+idCours
  let data={}
  try{
    data =(await axios.delete(URI,{timeout:2000,withCredentials:true})).data
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
  }finally{
    return data
  }
}
