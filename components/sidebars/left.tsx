"use client";
import { uuidGenerator } from "@/lib/custom-uuid";
import Link from "next/link";

import { FaGithub, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Links } from "@/components/sidebars/links";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostTag } from "@prisma/client";

export const LeftSideBar = () => {
    const [tags, setTags] = useState<PostTag[] | undefined>();
    useEffect(() => {
        axios
            .get("/api/tags")
            .then((res) => {
                setTags(res.data.tags);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full h-full mt-16 flex items-end flex-col gap-8">
            <div className="w-2/5  flex flex-col gap-2">
                {Links.map((link) => {
                    return (
                        <Link
                            href={link.href}
                            className="
                            hover:text-indigo-200 dark:hover:text-indigo-800
                            hover:underline dark:text-white text-black
                            hover:bg-indigo-700 dark:hover:bg-indigo-300 rounded-lg p-2
                            w-full
                            flex items-center justify-start gap-2
                        "
                            key={`${uuidGenerator()}-${link.name}`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    );
                })}
            </div>
            <div className="w-2/5 flex justify-between">
                <Link href={"#"}>
                    <FaGithub
                        size={24}
                        className="hover:scale-125 transition-transform"
                    />
                </Link>
                <Link href={"#"}>
                    <FaInstagramSquare
                        size={24}
                        className="hover:scale-125 transition-transform"
                    />
                </Link>
                <Link href={"#"}>
                    <FaLinkedin
                        size={24}
                        className="hover:scale-125 transition-transform"
                    />
                </Link>
                <Link href={"#"}>
                    <FaSquareXTwitter
                        size={24}
                        className="hover:scale-125 transition-transform"
                    />
                </Link>
            </div>
            <div className="w-2/5  flex flex-col gap-2">
                {tags ? (
                    tags.map((tag) => (
                        <Link href={`/tags/${tag.name}`} key={tag.id}>
                            #{tag.name}
                        </Link>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};
