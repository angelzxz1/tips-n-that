import Markdown from "react-markdown";
import { db } from "@/lib/db";
import { AuthorDetail } from "@/components/posts/author-detail";
import Comments from "@/components/posts/comments";
import LoadComments from "@/components/posts/load-comments";
const PostPage = async ({
    params,
}: {
    params: { username: string; post: string };
}) => {
    const { username, post } = params;
    const user = await db.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        return (
            <div className="w-1/2 h-full flex justify-center items-center">
                User not found
            </div>
        );
    }
    const postData = await db.post.findFirst({
        where: {
            slug: post,
            authorId: user.id,
        },
    });

    if (!postData) {
        return <div>Post not found</div>;
    }
    const comments = await db.comment.findMany({
        where: {
            postId: postData?.id,
        },
    });
    return (
        <div className="pt-[68px] w-full shadow-xl bg-white dark:bg-zinc-800 rounded-lg relative">
            <AuthorDetail author={user} />
            <div className="px-2 lg:p-4 w-full">
                <Markdown className="MD-cont">{postData.content}</Markdown>
            </div>
            <div className="px-4 border-t dark:border-white/10 mt-8 pt-8 pb-4">
                <Comments postId={postData.id} userImageUrl={user.imageUrl} />
                <LoadComments comments={comments} />
                <div className="testSass"></div>
            </div>
        </div>
    );
};

export default PostPage;
