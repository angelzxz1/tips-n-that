import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId: string = searchParams.get("authorId") as string;
        const user = await db.user.findUnique({
            where: {
                id: authorId,
            },
        });
        if (!user) return new NextResponse("User not found", { status: 404 });
        return NextResponse.json({
            message: "User found",
            user,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
