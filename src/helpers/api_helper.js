import axios from "axios"
import { configApi } from "./config"
// import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = localStorage.getItem('token')

//apply base url for axios
const API_URL = "https://veeoffice.com/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export const getData = (url) => axiosApi.get(url, configApi)
export const postData = (url, data) => axiosApi.post(url, data, configApi)
