import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const tagId: string = searchParams.get("tagId") as string;
        const tag = await db.postTag.findUnique({
            where: {
                id: tagId,
            },
        });
        if (!tag) return new NextResponse("Tag not found", { status: 404 });
        return NextResponse.json({
            message: "Tag found",
            tag,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
