"use client";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { FaHome, FaEnvelope, FaTasks, FaCog } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { BsStopwatch } from "react-icons/bs";
import { RiAuctionFill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isExcludedRoute = pathname === "/landing" || pathname === "/login" || pathname === "/signup" || pathname === "/unsubscribe" || pathname === "/contact";

    const items = [
        { title: "Home", disabled: false, href: "/", external: false, items: [], icon: FaHome },
        { title: "Campaigns", disabled: false, href: "/campaigns", external: false, items: [], icon: MdCampaign },
        { title: "Emails", disabled: false, href: "/emails", external: false, items: [], icon: FaEnvelope },
        { title: "Stages", disabled: false, href: "/stages", external: false, items: [], icon: BsStopwatch },
        { title: "Tasks", disabled: false, href: "/tasks", external: false, items: [], icon: FaTasks },
        { title: "Subscriptions", disabled: false, href: "/subscriptions", external: false, items: [], icon: RiAuctionFill },
        { title: "Settings", disabled: false, href: "/settings", external: false, items: [], icon: FaCog },
    ];

    return (
        <html lang="en">
        <body className="flex flex-row">
        <Toaster position="top-center" />
        {!isExcludedRoute && <Navbar items={items} />}
        <main className={`w-full ${isExcludedRoute ? "" : ""}`}>{children}</main>
        </body>
        </html>
    );
}