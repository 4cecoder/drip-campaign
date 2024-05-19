import axios from "axios"

const axiosWithAuth = () => {
    return axios.create({
        headers: {
            authorization: window.localStorage.getItem("token")
        },
        baseURL: process.env.NEXT_PUBLIC_URL,
    })
}

export const get = (url: string) => {
    axiosWithAuth().get(url).then(res => {
        return res;
    }).catch(err => {
        console.error(err)
    })
}

export const post = (url: string, form:any) => {
    axiosWithAuth().post(url,{form}).then(res => {
        return res;
    }).catch(err => {
        console.error(err)
    })
}

export const put = (url: string, form:any) => {
    axiosWithAuth().put(url,{form}).then(res => {
        return res;
    }).catch(err => {
        console.error(err)
    })
}

export const del = (url: string) => {
    axiosWithAuth().delete(url).then(res => {
        return res;
    }).catch(err => {
        console.error(err)
    })
}
