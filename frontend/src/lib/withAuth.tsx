"use client"
import {useEffect} from "react"
import {redirect} from "next/navigation";

export default function withAuth (Component: any, publicRoute?:boolean) {
    return function WithAuth(props: any) {
        useEffect(() => {
            if (window.localStorage.getItem("token") == "" && publicRoute != true) {
                redirect("/login")
            } else if(publicRoute && window.localStorage.getItem("token") !== ""){
                return redirect("/")
            }
        }, [])

        return <Component {...props} />;
    }
}