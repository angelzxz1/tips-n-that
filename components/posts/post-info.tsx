import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import ButtonInfo from "./button-info";

const PostInfo = async ({
    post,
    isPostPage,
}: {
    post: Post;
    isPostPage: boolean;
}) => {
    const thisProfile = await currentProfile();
    const numberOfComments = await db.comment.count({
        where: {
            postId: post.id,
        },
    });
    const numberOfLikes = await db.postLike.count({
        where: {
            postId: post.id,
        },
    });
    const iLikenIt = await db.postLike.findFirst({
        where: {
            postId: post.id,
            authorId: thisProfile?.id,
        },
    });
    if (isPostPage) {
        return (
            <div className="flex lg:flex-col gap-10  w-full items-center justify-evenly lg:items-end ">
                <div className="flex flex-col items-center justify-center">
                    <ButtonInfo
                        userId={thisProfile?.id}
                        postId={post.id}
                        likeId={iLikenIt?.id}
                        Icon="Heart"
                        value={numberOfLikes}
                    />
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
