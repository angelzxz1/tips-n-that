"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostItem } from "@/components/posts/post";
import Link from "next/link";
import { Post } from "@prisma/client";
const DisplayPosts = ({ username }: { username: string }) => {
    const [posts, setPosts] = useState<Post[] | undefined>();
    const [queue, setQueue] = useState<"following" | "recent">("following");
    useEffect(() => {
        axios.get("/api/posts").then((res) => {
            setPosts(res.data.post.reverse());
        });
        return () => {};
    }, []);
    if (!posts) {
        return <div>Loading...</div>;
    }
    if (posts.length === 0) {
        return (
            <>
                <div className="w-full text-center">
                    No posts yet :c, help us grow this! by{" "}
                    <Link href={`/${username}/create`}>
                        creating a new post!
                    </Link>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="my-8 mx-2 flex gap-4">
                <div>Following</div>
                <div>Most recent</div>
            </div>
            {posts.map((post) => (
                <PostItem key={post.id} postData={post} />
            ))}
        </>
    );
};

export default DisplayPosts;
