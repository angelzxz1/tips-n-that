"use client";

import { PostTag } from "@prisma/client";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { convertirCadena } from "@/lib/utils";

const TagsPage = () => {
    const [tags, setTags] = useState<PostTag[] | undefined>();
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        axios
            .get("/api/tags")
            .then((res) => {
                setTags(res.data.tags);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [search]);
    return (
        <div className="w-1/2 ">
            <div className="">
                <Input
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                    className="w-full border border-white/10 p-4 rounded-lg resize-none dark:bg-white/5 bg-white dark:text-white/90 h-full"
                />
            </div>
            {tags ? (
                tags
                    .filter((tag) => {
                        return convertirCadena(tag.name)
                            .toLowerCase()
                            .includes(convertirCadena(search).toLowerCase());
                    })
                    .map((tag) => {
                        return (
                            <Link
                                href={`/tags/${tag.name}`}
                                className="
                            hover:text-indigo-200 dark:hover:text-indigo-800
                            hover:underline dark:text-white text-black
                            hover:bg-indigo-700 dark:hover:bg-indigo-300 rounded-lg p-2
                            w-full
                            flex items-center justify-start gap-2
                        "
                                key={`${tag.id}`}
                            >
                                #{tag.name}
                            </Link>
                        );
                    })
            ) : (
                <Loader2Icon size={32} className="animate-spin" />
            )}
        </div>
    );
};

export default TagsPage;
