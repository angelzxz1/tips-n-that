"use client";
import { Post, PostTag, User } from "@prisma/client";
import { db } from "@/lib/db";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AuthorDetail } from "./author-detail";
import { getFirstHeading, slugify } from "@/lib/utils";
import PostInfo from "./post-info";
import { useState, useEffect } from "react";
import axios from "axios";

export const PostItem = ({ postData }: { postData: Post }) => {
    const { tagId, content, authorId, title } = postData;
    const [Tag, setTag] = useState<PostTag | null>(null);
    const [Author, setAuthor] = useState<User | null>(null);
    useEffect(() => {
        axios
            .get(`/api/tag`, { params: { tagId } })
            .then((res) => {
                setTag(res.data.tag);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`/api/user/`, { params: { authorId } })
            .then((res) => {
                setAuthor(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (!Tag || !Author) {
        return (
            <div
                className="p-4 rounded-lg shadow-lg transition-all hover:shadow-black/20 my-8 border border-black/40 flex flex-wrap
        dark:text-white text-black hover:text-black/80 dark:hover:text-white/80
        bg-white dark:bg-zinc-800"
            >
                <div className="flex-1 flex justify-end mr-4">
                    <div className="flex gap-2 items-center text-black hover:text-black/70 dark:text-white dark:hover:text-white/70">
                        <div className="w-32 h-4 animate-pulse bg-gray-200 rounded-full" />
                        <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200" />
                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="w-2/3 h-8 animate-pulse bg-gray-200 rounded-full" />
                    <ExternalLink className="animate-pulse" />
                </div>
                <div className="flex w-full border-t border-zinc-900 mt-6 pt-2 justify-between">
                    <div className="pb-0" />
                </div>
            </div>
        );
    }
    const slug = slugify(title);
    return (
        <Link
            className="p-4 rounded-lg shadow-lg transition-all hover:shadow-black/20 my-8 border border-black/40 flex flex-wrap
            dark:text-white text-black hover:text-black/80 dark:hover:text-white/80
            bg-white dark:bg-zinc-800
            "
            href={`/${Author.username}/${slug}`}
            target="_blank"
        >
            <AuthorDetail author={Author} />
            <div className="w-full flex items-center justify-between">
                <h1 className="pb-0">{title}</h1>
                <ExternalLink className="" />
            </div>
            <div className="flex w-full border-t border-zinc-900 mt-6 pt-2 justify-between">
                <PostInfo post={postData} isPostPage={false} />
                <Link href={`/tags/${Tag.name}`} className="pb-0">
                    {Tag.name}
                </Link>
            </div>
        </Link>
    );
};
