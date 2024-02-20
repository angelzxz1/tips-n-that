import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await currentProfile();
        console.log("debug 1");
        if (!currentUser)
            return new NextResponse("Unauthorized", { status: 401 });
        console.log("debug 2 ");
        const discussions = await db.discussion.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        });
        console.log("debug 3");
        return NextResponse.json({
            message: "last 10 discussions list",
            discussions,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
