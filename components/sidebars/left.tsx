"use client";
import { uuidGenerator } from "@/lib/custom-uuid";
import Link from "next/link";

import { FaGithub, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { Discussion, PostTag } from "@prisma/client";
import { Cog, Plus } from "lucide-react";

export const LeftSideBar = () => {
    const [listDiscussion, setListDiscussion] = useState<
        Discussion[] | undefined
    >();
    useEffect(() => {
        axios
            .get<{
                message: string;
                discussions: Discussion[];
            }>("/api/discussions")
            .then((res) => {
                console.log("debug 4");
                console.log(res.data);
                setListDiscussion(res.data.discussions);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full h-full mt-16 flex items-end flex-col gap-8">
            <div className="w-2/5  flex flex-col gap-2">
                <h3 className="font-bold text-xl">Active Discussions</h3>
                <Link className="" href={"/discussions/create"}>
                    <Plus className="w-6 h-6" />
                </Link>

                {listDiscussion ? (
                    listDiscussion.length > 0 ? (
                        listDiscussion.map((Discussion) => (
                            <Link
                                href={`/discussions/${Discussion.title}`}
                                key={Discussion.id}
                                className="dark:hover:text-indigo-200 hover:text-indigo-800"
                            >
                                {Discussion.content}
                            </Link>
                        ))
                    ) : (
                        <div className="w-full">No active discussions</div>
                    )
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};
