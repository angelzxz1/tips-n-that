"use client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const NotificationBell = () => {
    const [notifications, setNotifications] = useState<boolean>(false);
    return (
        <Link
            className="relative"
            href="#"
            onClick={() => {
                setNotifications((prev) => !prev);
            }}
        >
            {notifications && (
                <div className="bg-red-600 h-3 w-3 rounded-full z-50 absolute right-0" />
            )}

            <Bell className="z-40" />
        </Link>
    );
};
