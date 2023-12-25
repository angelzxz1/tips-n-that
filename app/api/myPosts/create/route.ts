import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
export async function POST(req: Request) {
    try {
        const { post, tagId } = await req.json();
        // console.log(post, tagId);
        if (!post)
            return new NextResponse("Message is required", { status: 400 });
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const postRes = await db.post.create({
            data: {
                content: post,
                authorId: profile.id,
                tagId: tagId,
            },
        });
        console.log(postRes);
        return NextResponse.json({
            message: "Post created successfully",
            post,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
