import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const tagname: string = searchParams.get("tagname") as string;
        const tag = await db.postTag.findUnique({
            where: {
                name: tagname,
            },
        });

        if (!tag) return new NextResponse("Tag not found", { status: 404 });
        const { id } = tag;
        const postsTag = await db.post.findMany({
            where: {
                tag: {
                    id: id,
                },
            },
        });
        console.log(postsTag);
        return NextResponse.json({
            message: "List of posts with tag",
            postsTag: postsTag.reverse(),
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
