import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
interface jsonData {
    postId: string;
    comment: string;
}
export async function POST(req: Request) {
    try {
        const { postId, comment }: jsonData = await req.json();
        const profile = await currentProfile();
        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!post) return new NextResponse("Post not found", { status: 404 });

        const commentRes = await db.comment.create({
            data: {
                authorId: profile.id,
                content: comment,
                postId: post.id,
            },
        });
        return NextResponse.json({
            message: "Thank you for sharing!",
            commentRes,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
