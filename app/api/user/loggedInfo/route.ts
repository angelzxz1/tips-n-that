import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
    try {
        const thisProfile = await currentProfile();
        if (!thisProfile)
            return NextResponse.json({
                message: "Not logged in",
            });
        return NextResponse.json({
            message: "Sent comments",
            thisProfile,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
