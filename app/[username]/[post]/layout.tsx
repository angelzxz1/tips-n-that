import PostInfo from "@/components/posts/post-info";
import { db } from "@/lib/db";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
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
        <div className="w-full relative flex justify-center">
            <div className=" fixed h-full left-0 w-1/4 p-4 flex justify-end">
                <PostInfo post={postData} isPostPage={true} />
            </div>
            <main className="w-1/2">{children}</main>
        </div>
    );
};

export default Layout;
