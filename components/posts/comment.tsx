import { Comment, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export const CommentItem = ({ comment }: { comment: Comment }) => {
    const [creator, setCreator] = useState<User | undefined>(undefined);

    useEffect(() => {
        axios
            .get("/api/user", {
                params: { authorId: comment.authorId },
            })
            .then((res) => {
                setCreator(res.data.user as User);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [comment.authorId]);
    if (!creator) {
        return (
            <div className="w-full mt-8 flex gap-4 items-start">
                <div className="w-12 h-12 animate-pulse bg-gray-200 rounded-full"></div>
                <div className="w-full flex-wrap border rounded-md dark:border-white/10 p-4 flex gap-4 animate-pulse">
                    <div className=" w-full font-thin bg-gray-200 rounded-md h-4"></div>
                    <div className=" w-full font-thin bg-gray-200 rounded-md h-4"></div>
                    <div className=" w-full font-thin bg-gray-200 rounded-md h-4"></div>
                    <div className=" w-full font-thin bg-gray-200 rounded-md h-4"></div>
                    <div className=" w-full font-thin bg-gray-200 rounded-md h-4"></div>
                </div>
            </div>
        );
    } else
        return (
            <div
                className="w-full mt-8 flex gap-4 items-start "
                key={comment.id}
            >
                <div className="w-12 h-12 ">
                    <Image
                        src={creator.imageUrl || "/user.svg"}
                        alt="user"
                        className="w-full h-full object-cover rounded-full"
                        height={48}
                        width={48}
                    />
                </div>{" "}
                <div className="w-full flex-wrap border rounded-md dark:border-white/10 p-4 flex gap-4 ">
                    <div className=" w-full font-thin ">
                        {creator.username}
                        {" on: "}
                        <span className="text-xs ">
                            {comment.createdAt.toDateString()}
                        </span>
                    </div>
                    <Markdown className="MD-cont">{comment.content}</Markdown>
                </div>
            </div>
        );
};
