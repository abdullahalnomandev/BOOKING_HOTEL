import { API } from "./ApiInterceptor";

// USERS
 const getData =  (api_url,body) =>  API.post(api_url,body);
 const patchData= (api_url,body) =>  API.patch(api_url,body);
 const postData = (api_url,body) =>  API.post(api_url,body);
 const deleteData =(api_url,body) => API.patch(api_url,body);

//AUTH
 const signIn = (fromData) => API.post("/user/signIn", fromData);
 const signUp = (fromData) => API.post("/user/signUp", fromData);

export { signIn, signUp, patchData, postData ,getData,deleteData};