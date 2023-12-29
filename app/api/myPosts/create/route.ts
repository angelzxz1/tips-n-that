import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { slugify, getFirstHeading } from "@/lib/utils";
export async function POST(req: Request) {
    try {
        const { post, tagId } = await req.json();

        if (!post)
            return new NextResponse("Message is required", { status: 400 });
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const firstHeading = getFirstHeading(post);
        if (!firstHeading)
            return new NextResponse("Post must have a title!", {
                status: 400,
            });
        const postRes = await db.post.create({
            data: {
                content: post,
                authorId: profile.id,
                tagId: tagId,
                title: firstHeading,
                slug: slugify(firstHeading),
            },
        });
        return NextResponse.json({
            message: "Post created successfully",
            postRes,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
