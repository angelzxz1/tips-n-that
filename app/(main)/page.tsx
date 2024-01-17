import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { PostItem } from "@/components/posts/post";
import Link from "next/link";
import DisplayPosts from "@/components/main/display-posts";

const SetUpPage = async () => {
    const profile = await initialProfile();

    return (
        <main className="relative w-full flex justify-center lg:justify-end xl:justify-center items-center pt-[68px] h-full ">
            <section className="h-full pt-[68px] top-0 left-0 fixed w-1/4 hidden lg:flex justify-center items-center ">
                this is the left side
            </section>
            <section className="h-full lg:w-3/4 xl:w-2/4 w-full ">
                <DisplayPosts username={profile.username} />
            </section>
            <section className="min-h-full pt-[68px] top-0 right-0 fixed w-1/4 hidden xl:flex justify-center items-center">
                this is the right side
            </section>
        </main>
    );
};

export default SetUpPage;
