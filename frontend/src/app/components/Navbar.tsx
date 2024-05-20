"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Image from "next/image";

interface SidebarNavItem {
    title: string,
    disabled: boolean,
    href: string,
    external: boolean,
    src:string,
    items:SidebarNavItem[]
}

export interface DocsSidebarNavProps {
    items: SidebarNavItem[]
}

 function Navbar({ items }: DocsSidebarNavProps) {
    const pathname = usePathname()

    return items.length ? (
        <div className="w-56 bg-gray-800 text-white">
            <div className={"logo flex w-full p-2  items-center"}>
                <div className={"border-[1px] rounded-md p-[2px] flex items-center border-blue-400"}>
                <div className={"bg-gray-600 rounded-md flex justify-center w-10"}>
                    <Image src={"/logo.png"} className={""} height={20} width={20} alt={"Logo"}/>
                </div>
            <p className={"w-full m-0 p-0 text-sm ml-2"}> Drop Campaign </p>
                </div>
            </div>
               {items.map((item, index) => (
                <Link href={item.href} key={index} className={"py-4 outline-none cursor-pointer hover:bg-gray-700 flex flex-col justify-center"}>
                    <div  className={"flex ml-3"}>
                        <Image src={item?.src} className={""} height={20} width={20} alt={"Logo"}/>
                        <h4 className="select-none rounded-md px-2 text-sm  font-medium">
                            {item.title}
                        </h4>
                    </div>

                    {item.items ? (
                        <DocsSidebarNavItems items={item.items} pathname={pathname} />
                    ) : null}
                </Link>
            ))}
            {window.localStorage.getItem("token")?
                <Link onClick={()=> window.localStorage.setItem("token","")} href={"/login"} className={"py-4 outline-none cursor-pointer hover:bg-gray-700 flex flex-col justify-center"}>
                <div className={"flex ml-3"}>
                    <Image src={"/setting.svg"} className={""} height={20} width={20} alt={"Logo"}/>
                    <h4 className="select-none rounded-md px-2 text-sm  font-medium">
                       Logout
                    </h4>
                </div>
            </Link>: <Link href={"/login"} className={"py-4 outline-none cursor-pointer hover:bg-gray-700 flex flex-col justify-center"}>
                    <div  className={"flex ml-3"}>
                        <Image src={"/setting.svg"} className={""} height={20} width={20} alt={"Logo"}/>
                        <h4 className="select-none rounded-md px-2 text-sm  font-medium">
                           Login
                        </h4>
                    </div>
                </Link>
            }
        </div>
    ) : null
}



interface DocsSidebarNavItemsProps {
    items: SidebarNavItem[]
    pathname: string | null
}

export function DocsSidebarNavItems({
                                        items,
                                        pathname,
                                    }: DocsSidebarNavItemsProps) {
    return items?.length ? (
        <div className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) =>
                    !item.disabled && item.href ? (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex w-full items-center rounded-md p-2 hover:underline",
                                {
                                    "bg-muted": pathname === item.href,
                                }
                            )}
                            target={item.external ? "_blank" : ""}
                            rel={item.external ? "noreferrer" : ""}
                        >
                            {item.title}
                        </Link>
                    ) : (
                        <span key={Math.random()} className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">{item.title}</span>
                    )
            )}
        </div>
    ) : null
}

export default Navbar