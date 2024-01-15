import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
interface jsonData {
    userId: string;
}

export async function GET(req: NextRequest) {
    console.log("se esta llamando a la ruta GET /api/posts");
    try {
        const post = await db.post.findMany()
        if (!post) return new NextResponse("User not found", { status: 404 });
        return NextResponse.json({
            message: "User found",
            post,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
