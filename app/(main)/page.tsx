import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { PostItem } from "@/components/posts/post";
import Link from "next/link";

const SetUpPage = async () => {
    const profile = await initialProfile();
    const posts = await db.post.findMany();

    return (
        <main className="relative w-full flex justify-center lg:justify-end xl:justify-center items-center pt-[68px] h-full ">
            <section className="h-full pt-[68px] top-0 left-0 fixed w-1/4 hidden lg:flex justify-center items-center ">
                this is the left side
            </section>
            <section className="h-full lg:w-3/4 xl:w-2/4 w-full ">
                {posts.length > 0 ? (
                    posts
                        .reverse()
                        .map((post) => (
                            <PostItem key={post.id} postData={post} />
                        ))
                ) : (
                    <div className="w-full text-center">
                        No posts yet :c, help us grow this! by{" "}
                        <Link href={`/${profile.username}/create`}>
                            creating a new post!
                        </Link>
                    </div>
                )}
            </section>
            <section className="min-h-full pt-[68px] top-0 right-0 fixed w-1/4 hidden xl:flex justify-center items-center">
                this is the right side
            </section>
        </main>
    );
};

export default SetUpPage;
