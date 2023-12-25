import { Post } from "@prisma/client";
import { db } from "@/lib/db";
import Markdown from "react-markdown";
export const PostItem = async ({ postData }: { postData: Post }) => {
    const { tagId, content } = postData;
    const tag = await db.postTag.findUnique({
        where: {
            id: tagId,
        },
    });
    return (
        <div>
            <Markdown>{content}</Markdown>
        </div>
    );
};
