import { db } from "@/lib/db";
import { Comment, User } from "@prisma/client";
import Image from "next/image";

import Markdown from "react-markdown";
const LoadComments = async ({ comments }: { comments: Comment[] }) => {
    return (
        <div className="w-full flex gap-4 flex-col">
            {comments.map(async (comment) => {
                const creator = (await db.user.findUnique({
                    where: {
                        id: comment.authorId as string,
                    },
                })) as User;
                return (
                    <div
                        className="w-full mt-8 flex gap-4 items-start"
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
                        <div className="w-full flex-wrap border rounded-md dark:border-white/10 p-4 flex gap-4">
                            <div className=" w-full font-thin">
                                {creator.username}
                                {" on: "}
                                <span className="text-xs ">
                                    {comment.createdAt.toDateString()}
                                </span>
                            </div>
                            <Markdown>{comment.content}</Markdown>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LoadComments;
