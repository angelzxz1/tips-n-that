import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { PostItem } from "@/components/posts/post";
import Link from "next/link";
import DisplayPosts from "@/components/main/display-posts";
import { LeftSideBar } from "@/components/sidebars/left";
import { RightSideBar } from "@/components/sidebars/right";

const SetUpPage = async () => {
    const profile = await initialProfile();

    return (
        <main className="relative w-full flex justify-center lg:justify-end xl:justify-center items-center pt-[68px] h-full ">
            <section className="h-full pt-[68px] top-0 left-0 fixed w-1/4 hidden lg:flex justify-center items-center ">
                <LeftSideBar />
            </section>
            <section className="h-full lg:w-3/4 xl:w-2/4 w-full ">
                <DisplayPosts username={profile.username} />
            </section>
            <section className="h-full pt-[68px] top-0 right-0 fixed w-1/4 hidden xl:flex justify-center items-center">
                <RightSideBar />
            </section>
        </main>
    );
};

export default SetUpPage;
