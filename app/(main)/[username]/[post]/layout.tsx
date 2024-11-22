import { Footer } from "@/components/footer/Footer";
import PostInfo from "@/components/posts/post-info";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { username: string; post: string };
}) => {
    const { username, post } = params;
    const isLogged = !!(await currentProfile());
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
        <div className="w-full relative flex justify-center flex-wrap">
            <div
                className="rounded-t-md fixed py-4 flex justify-end z-40 bottom-0 w-full bg-background border-t
                lg:h-full lg:left-0 lg:w-1/4 lg:bg-transparent lg:justify-center lg:items-center
                
                "
            >
                <PostInfo post={postData} isPostPage={true} />
            </div>
            <main className="w-full lg:w-1/2 ">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
