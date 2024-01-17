"use client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Post, User } from "@prisma/client";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import ButtonInfo from "./button-info";
import { useEffect, useState } from "react";
import axios from "axios";
const PostInfo = ({
    post,
    isPostPage,
}: {
    post: Post;
    isPostPage: boolean;
}) => {
    const [numberOfComments, setNumberOfComments] = useState(0);
    useEffect(() => {
        axios
            .get(`/api/posts/comments`, { params: { postId: post.id } })
            .then((res) => {
                setNumberOfComments(res.data.numberOfComments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [post.id]);
    if (isPostPage) {
        return (
            <div className="flex lg:flex-col gap-10  w-full items-center justify-evenly lg:items-end ">
                <div className="flex flex-col items-center justify-center">
                    <ButtonInfo postId={post.id} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MessageCircle className="cursor-pointer" strokeWidth={1} />
                    {numberOfComments}
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Bookmark strokeWidth={1} />
                </div>
            </div>
        );
    }
    return <div>post info home</div>;
};

export default PostInfo;
