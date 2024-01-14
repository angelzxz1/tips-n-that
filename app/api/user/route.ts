import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface jsonData {
    userId: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("se esta llamando a la ruta GET /api/user");
    // try {
    //     const { userId }: jsonData = await req.json();
    //     const user = await db.user.findUnique({
    //         where: {
    //             id: userId,
    //         },
    //     });
    //     if (!user) return new NextResponse("User not found", { status: 404 });
    //     return NextResponse.json({
    //         message: "User found",
    //         user,
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return new NextResponse("Internal Error", { status: 500 });
    // }
}
