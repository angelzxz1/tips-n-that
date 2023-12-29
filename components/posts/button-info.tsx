"use client";
import { PostLike } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ButtonInfo = ({
    children,
    userId,
    postId,
    Like,
}: {
    children: React.ReactNode | React.ReactNode[];
    userId: string | undefined;
    postId: string;
    Like: PostLike | null;
}) => {
    const router = useRouter();
    if (!userId) {
        return <div>{children}</div>;
    }
    if (Like)
        return (
            <div
                className=""
                onClick={async () => {
                    try {
                        const res = await axios.delete("/api/myPosts/like", {
                            data: {
                                LikeId: Like.id,
                                postId,
                            },
                        });
                        console.log(res);
                        router.refresh();
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                {children}
            </div>
        );
    return (
        <div
            className=""
            onClick={async () => {
                try {
                    const res = await axios.post("/api/myPosts/like", {
                        postId,
                    });
                    console.log(res);
                    router.refresh();
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            {children}
        </div>
    );
};

export default ButtonInfo;
