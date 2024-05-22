"use client";
import "./globals.css";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isExcludedRoute = pathname === "/landing" || pathname === "/login" || pathname === "/signup" || pathname === "/unsubscribe" ||  pathname === "/login" || pathname === "/signup" || pathname === "/contact" ;

    const items = [
        { title: "Home", disabled: false, href: "/", external: false, items: [], src: "/home.svg" },
        { title: "Campaigns", disabled: false, href: "/campaigns", external: false, items: [], src: "customer.svg" },
        { title: "Emails", disabled: false, href: "/emails", external: false, items: [], src: "/email.svg" },
        { title: "Stages", disabled: false, href: "/stages", external: false, items: [], src: "/stage.svg" },
        { title: "Tasks", disabled: false, href: "/tasks", external: false, items: [], src: "/task.svg" },
        { title: "Subscriptions", disabled: false, href: "/subscriptions", external: false, items: [], src: "/subscriptions.svg" },
        { title: "Settings", disabled: false, href: "/settings", external: false, items: [], src: "/setting.svg" },
    ];

    return (
        <html lang="en">
        <body className="flex flex-row">
        {!isExcludedRoute && <Navbar items={items} />}
        <main className={`w-full ${isExcludedRoute ? "" : ""}`}>{children}</main>
        </body>
        </html>
    );
}