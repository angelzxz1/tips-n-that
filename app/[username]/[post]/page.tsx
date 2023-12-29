import Markdown from "react-markdown";
import { db } from "@/lib/db";
import { AuthorDetail } from "@/components/posts/author-detail";
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
    return (
        <div className="pt-[68px] w-full shadow-xl p-4 bg-white dark:bg-zinc-800 rounded-lg relative">
            <AuthorDetail author={user} />
            <Markdown>{postData.content}</Markdown>
        </div>
    );
};

export default PostPage;
