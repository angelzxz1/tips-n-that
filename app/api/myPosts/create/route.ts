import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log(req.body);
        return NextResponse.json({ message: "Post created successfully" });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
