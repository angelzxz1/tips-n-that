import { Post, PostTag, User } from "@prisma/client";
import { db } from "@/lib/db";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AuthorDetail } from "./author-detail";
import { getFirstHeading, slugify } from "@/lib/utils";
import PostInfo from "./post-info";

export const PostItem = async ({ postData }: { postData: Post }) => {
    const { tagId, content, authorId, title } = postData;
    const tag = (await db.postTag.findUnique({
        where: {
            id: tagId,
        },
    })) as PostTag;
    const author = (await db.user.findUnique({
        where: {
            id: authorId,
        },
    })) as User;
    const slug = slugify(title);
    return (
        <Link
            className="p-4 rounded-lg shadow-lg transition-all hover:shadow-black/20 my-8 border border-black/40 flex flex-wrap
            dark:text-white text-black hover:text-black/80 dark:hover:text-white/80
            bg-white dark:bg-zinc-800
            "
            href={`/${author.username}/${slug}`}
            target="_blank"
        >
            <AuthorDetail author={author as User} />
            <div className="w-full flex items-center justify-between">
                <h1 className="pb-0">{title}</h1>
                <ExternalLink className="" />
            </div>
            <div className="flex w-full border-t border-zinc-900 mt-6 pt-2 justify-between">
                <PostInfo post={postData} isPostPage={false} />
                <Link href={`/tags/${tag.name}`} className="pb-0">
                    {tag.name}
                </Link>
            </div>
        </Link>
    );
};
