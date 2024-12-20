"use client";

import { PostItem } from "@/components/posts/post";
import { Post } from "@prisma/client";
import axios from "axios";
import { use, useEffect, useState } from "react";

const TagName = ({ params }: { params: Promise<{ tagname: string }> }) => {
    const [postsTag, setPostsTag] = useState<Post[] | undefined>();
    const { tagname } = use(params);
    useEffect(() => {
        axios
            .get("/api/tag/posts", { params: { tagname } })
            .then((res) => {
                console.log(res.data);
                setPostsTag(res.data.postsTag);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [tagname]);
    if (!postsTag) return <div>Loading...</div>;
    if (postsTag.length === 0) return <div>No tags found</div>;
    return (
        <div className="w-1/2">
            {postsTag.map((post: Post) => (
                <PostItem key={post.id} postData={post} />
            ))}
        </div>
    );
};

export default TagName;
