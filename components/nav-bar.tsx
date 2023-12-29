import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "./toggle-mode";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "./notification-bell";
import { Lightbulb } from "lucide-react";

export const NavBar = async () => {
    const loggedIn = !!(await currentProfile());

    return (
        <nav className="w-full flex backdrop-blur-2xl p-4 z-50 fixed top-0 bg-white dark:bg-white/10 justify-center shadow">
            <div className="max-w-5xl w-full flex justify-between">
                <div className="flex gap-4 items-center">
                    <Link
                        href="/"
                        className="dark:text-white dark:bg-[#232324] text-black bg-[#f0f0f5] p-2 rounded-md
                        hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:text-black/80 dark:hover:text-white/80
                        flex items-center gap-2
                        "
                    >
                        <Lightbulb className=" " />
                        Home
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    {loggedIn ? (
                        <>
                            <Link href="/myPosts/create">
                                <Button>Create a New Post</Button>
                            </Link>
                            <NotificationBell />
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button>Sign-in</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button variant="ghost">Sign-up</Button>
                            </Link>
                        </>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};
