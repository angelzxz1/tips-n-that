"use client";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import Markdown from "react-markdown";
import { db } from "@/lib/db";
import { CommentItem } from "./comment";

const LoadComments = ({ comments }: { comments: Comment[] }) => {
    return (
        <div className="w-full flex gap-4 flex-col mb-4 ">
            {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
            ))}
        </div>
    );
};

export default LoadComments;
