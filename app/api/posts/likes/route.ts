import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postId: string = searchParams.get("postId") as string;
        const comments = await db.postLike.findMany({
            where: {
                postId: postId,
            },
        });
        return NextResponse.json({
            message: "Sent likes",
            comments,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
