import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "./toggle-mode";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavBar = async () => {
    const loggedIn = !!(await currentProfile());

    return (
        <nav className="w-full flex backdrop-blur-2xl p-4 z-50 fixed top-0 dark:bg-white/10 justify-between">
            <div className="flex gap-4"></div>
            <div className="flex gap-4">
                {loggedIn ? (
                    <>
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
        </nav>
    );
};
