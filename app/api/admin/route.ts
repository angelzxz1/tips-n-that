import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username: string = searchParams.get("username") as string;

        if (username === "")
            return new NextResponse("Username is empty", { status: 400 });
        const user = await db.admin.findUnique({
            where: {
                username,
            },
        });
        if (!user) return new NextResponse("User not found", { status: 404 });
        console.log(user);
        return NextResponse.json({
            message: "user found",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username: string = searchParams.get("username") as string;
        const role: Role = searchParams.get("role") as Role;
        const tempMaster = await db.user.findUnique({
            where: {
                username,
            },
        });
        if (!tempMaster)
            return new NextResponse("User doesn't exist", { status: 404 });
        if (role !== Role.ADMIN && role !== Role.REVIEWER)
            return new NextResponse("Invalid role", { status: 400 });
        const tempCreate = await db.admin.create({
            data: {
                username: tempMaster.username,
                password: tempMaster.password,
                accountID: tempMaster.id,
                role: role,
            },
        });

        return NextResponse.json({
            message: "Admin user created",
            data: tempCreate,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
