import axios from "axios";

const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

const API = axios.create({
  baseURL: process.env.REACT_APP_PROD_API,
});

console.log(REACT_APP_DEV_API, REACT_APP_PROD_API, devEnv);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }
  // console.log(
  //   (req.headers.Authorization = `Bearer ${
  //     JSON.parse(localStorage.getItem("token")).token
  //   }`)
  // );
  return req;
});

//authentication routes
export const register = (userData) => API.post("/user/register", userData);
export const login = (userData) => API.post("/user/login", userData);

//feature request routes
//add new feature
export const addNewFeature = (newFeatureData) =>
  API.post("/feature/add", newFeatureData);

//search feature by title or description
export const searchByFeatureName = (searchName) =>
  API.get(`/feature/search/${searchName}`);

//get all features
export const getAllFeatures = () => API.get("/feature/all");

//comment on feature
export const commentOnFeature = (commentData) =>
  API.put("/feature/comment", commentData);
