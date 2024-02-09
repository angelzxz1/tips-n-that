import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await currentProfile();
        if (!currentUser)
            return new NextResponse("Unauthorized", { status: 401 });
        const { id } = currentUser;
        const AdminUser = await db.admin.findUnique({
            where: {
                accountID: id,
            },
        });
        if (!AdminUser)
            return new NextResponse("Unauthorized", { status: 401 });
        const tags = await db.postTag.findMany();
        return NextResponse.json({
            message: "Tag list",
            tags,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
