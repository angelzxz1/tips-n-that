import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";
import { User } from "@prisma/client";

export const initialProfile = async (): Promise<User> => {
    const user = await currentUser();

    if (!user) return redirectToSignIn();
    console.log("User Found");
    const profile = await db.user.findUnique({
        where: { userId: user.id },
    });

    if (!profile) {
        console.log("Profile Not Found");
        return await db.user.create({
            data: {
                userId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstName: user.firstName ? user.firstName : "",
                lastName: user.lastName ? user.lastName : "",
                username: user.username
                    ? user.username
                    : user.emailAddresses[0].emailAddress,
                password: "",
                imageUrl: user.imageUrl,
            },
        });
    }
    console.log("Profile Found and returned");
    return profile;
};
