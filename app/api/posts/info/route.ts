import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
    // console.log("se esta llamando a la ruta GET /api/posts/info");
    try {
        const { searchParams } = new URL(req.url);
        const postId: string = searchParams.get("postId") as string;
        const likes = await db.postLike.findMany({
            where: {
                postId: postId,
            },
        });
        const thisProfile = await currentProfile();
        if (!thisProfile)
            return NextResponse.json({
                numberOfLikes: likes.length,
                iLikeIt: false,
                loggedIn: false,
            });
        const iLikeIt = likes.find((like) => like.authorId === thisProfile.id);

        return NextResponse.json({
            numberOfLikes: likes.length,
            iLikeIt: !!iLikeIt,
            loggedIn: true,
            likeId: iLikeIt ? iLikeIt.id : "",
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
