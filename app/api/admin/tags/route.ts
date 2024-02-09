import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: NextRequest) {
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

        const { tagName } = await req.json();
        console.log(tagName);
        if (!tagName)
            return new NextResponse("Tag name is required", { status: 400 });
        const doExist = await db.postTag.findUnique({
            where: {
                name: tagName,
            },
        });
        if (doExist)
            return new NextResponse("Tag already exists", { status: 400 });

        const newTag = await db.postTag.create({
            data: {
                name: tagName,
            },
        });
        console.log(newTag);
        return NextResponse.json({
            message: "Tag created successfully",
            newTag,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const currentUser = await currentProfile();
        if (!currentUser)
            return new NextResponse("Unauthorized", { status: 401 });
        const { id: currentUserId } = currentUser;
        const AdminUser = await db.admin.findUnique({
            where: {
                accountID: currentUserId,
            },
        });
        if (!AdminUser)
            return new NextResponse("Unauthorized", { status: 401 });

        const { tagName, id }: { tagName: string; id: string } =
            await req.json();
        console.log();
        if (!tagName)
            return new NextResponse("Tag name is required", { status: 400 });
        if (!id) return new NextResponse("Tag id is required", { status: 400 });
        const doExist = await db.postTag.findUnique({
            where: {
                id: id,
            },
        });
        if (!doExist)
            return new NextResponse("Tag ID is not in database exists", {
                status: 400,
            });
        if (tagName === doExist.name)
            return new NextResponse("Tag name is the same", { status: 400 });
        const editTag = await db.postTag.update({
            where: {
                id: id,
            },
            data: {
                name: tagName,
            },
        });

        return NextResponse.json({
            message: "Tag edited successfully",
            editTag,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const currentUser = await currentProfile();
        if (!currentUser)
            return new NextResponse("Unauthorized", { status: 401 });
        const { id: currentUserId } = currentUser;
        const AdminUser = await db.admin.findUnique({
            where: {
                accountID: currentUserId,
            },
        });
        if (!AdminUser)
            return new NextResponse("Unauthorized", { status: 401 });

        const { tagName, id }: { tagName: string; id: string } =
            await req.json();
        console.log(tagName, id);
        // if (!tagName)
        //     return new NextResponse("Tag name is required", { status: 400 });
        // if (!id) return new NextResponse("Tag id is required", { status: 400 });
        // const doExist = await db.postTag.findUnique({
        //     where: {
        //         id: id,
        //     },
        // });
        // if (!doExist)
        //     return new NextResponse("Tag ID is not in database exists", {
        //         status: 400,
        //     });
        // if (tagName === doExist.name)
        //     return new NextResponse("Tag name is the same", { status: 400 });
        // const editTag = await db.postTag.update({
        //     where: {
        //         id: id,
        //     },
        //     data: {
        //         name: tagName,
        //     },
        // });

        return NextResponse.json({
            message: "Tag deleted successfully",
            // editTag,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
