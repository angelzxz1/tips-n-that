import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { PostLike } from "@prisma/client";
export async function POST(req: Request) {
    try {
        const { postId }: { postId: string } = await req.json();
        const profile = await currentProfile();
        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!post) return new NextResponse("Post not found", { status: 404 });

        const likeRes = await db.postLike.create({
            data: {
                authorId: profile.id,
                postId: post.id,
            },
        });

        return NextResponse.json({
            message: "Liked it!",
            likeRes,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { LikeId, postId }: { LikeId: string; postId: string } =
            await req.json();
        const profile = await currentProfile();
        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!post) return new NextResponse("Post not found", { status: 404 });
        const like = await db.postLike.findUnique({
            where: {
                id: LikeId,
            },
        });
        if (!like) return new NextResponse("Like not found", { status: 404 });
        const likeRes = await db.postLike.delete({
            where: {
                id: LikeId,
            },
        });
        return NextResponse.json({
            message: "Unliked it!",
            likeRes,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
