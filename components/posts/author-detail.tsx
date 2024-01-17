"use client";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const AuthorDetail = ({ author }: { author: User }) => {
    return (
        <div className="flex-1 flex justify-end mr-4">
            <Link
                href={`/${author.username}`}
                className="flex gap-2 items-center text-black hover:text-black/70 dark:text-white dark:hover:text-white/70"
            >
                <div className="text-[0.75rem]">
                    {`${author.firstName} ${author.lastName.split(" ")[0]}`}
                </div>
                <Avatar>
                    <AvatarImage src={author.imageUrl as string} />

                    <AvatarFallback>{`${author.firstName?.charAt(
                        0
                    )}${author.lastName?.charAt(0)}`}</AvatarFallback>
                </Avatar>
            </Link>
        </div>
    );
};
