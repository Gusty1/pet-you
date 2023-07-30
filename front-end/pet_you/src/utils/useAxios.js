import axios from "axios"

import { baseURL } from './constant.js'

const useAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

const controller = new AbortController()

//請求攔截器
useAxios.interceptors.request.use((config) => {
  return {
    ...config,
    signal: controller.signal
  }
}, (error) => {
  return Promise.reject(error)
})


//響應攔截器
useAxios.interceptors.response.use((response) => {
  //2XX的狀態碼都會觸發，對該數據做點甚麼
  // controller.abort()
  return response
}, (error) => {
  // controller.abort()
  //超出2XX的狀態碼都會觸發，對該錯誤做點甚麼
  console.log(error)
  window.location.assign("/Pet_you/error")
  return Promise.reject(error)
})

export { useAxios }