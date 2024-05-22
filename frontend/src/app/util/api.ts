// src/app/util/api.ts
import axios from "axios"


const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        baseURL: process.env.NEXT_PUBLIC_URL,
    })
}


export const get = (url: string) => {
   return axiosWithAuth().get(url);
}

export const post = (url: string, form:any) => {
    return axiosWithAuth().post(url,form)
}

export const put = (url: string, form:any) => {
  return axiosWithAuth().put(url,{form})
}

export const del = (url: string) => {
    return axiosWithAuth().delete(url);
}
