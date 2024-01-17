"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

const Icon = ({ Icon }: { Icon: "Heart" | "MessageCircle" | "Bookmark" }) => {
    if (Icon === "Heart") return <Heart strokeWidth={1} />;
    if (Icon === "MessageCircle") return <MessageCircle strokeWidth={1} />;
    return <Bookmark strokeWidth={1} />;
};

const ButtonInfo = ({ postId }: { postId: string }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [iLikedIt, setILikedIt] = useState(false);
    const [likeId, setLikeId] = useState<string | undefined>(undefined);
    const [clicable, setClicable] = useState(true);

    const Icon = "Heart";

    useEffect(() => {
        axios
            .get(`/api/posts/info`, { params: { postId } })
            .then((res) => {
                setNumberOfLikes(res.data.numberOfLikes);
                setILikedIt(res.data.iLikenIt);
                setLikeId(res.data.likeId);
                setLoggedIn(res.data.loggedIn);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [postId, clicable]);
    if (!loggedIn) {
        return (
            <>
                <div>
                    {Icon === "Heart" ? (
                        <Heart strokeWidth={1} />
                    ) : Icon === "MessageCircle" ? (
                        <MessageCircle strokeWidth={1} />
                    ) : (
                        <Bookmark strokeWidth={1} />
                    )}
                </div>
                {numberOfLikes}
            </>
        );
    }
    return (
        <>
            <Button
                variant={"none"}
                size={"none"}
                disabled={!clicable}
                onClick={async () => {
                    if (iLikedIt) {
                        if (!clicable || !likeId) return;
                        setClicable(false);
                        try {
                            setILikedIt(false);
                            const res = await axios.delete(
                                "/api/myPosts/like",
                                {
                                    data: {
                                        LikeId: likeId,
                                        postId,
                                    },
                                }
                            );
                            setClicable(!!res);
                        } catch (error) {
                            console.log("error");
                            setILikedIt(false);
                        } finally {
                            setClicable(true);
                        }
                    } else {
                        if (!clicable) return;
                        setClicable(false);
                        try {
                            setILikedIt(true);
                            const res = await axios.post("/api/myPosts/like", {
                                postId,
                            });
                            setLikeId(res.data.likeRes.id);
                            setClicable(!!res);
                        } catch (error) {
                            setILikedIt(true);
                            setClicable(true);
                        }
                    }
                }}
            >
                {Icon === "Heart" ? (
                    <Heart
                        strokeWidth={1}
                        className={cn(
                            "cursor-pointer",
                            iLikedIt ? " text-red-500" : ""
                        )}
                    />
                ) : Icon === "MessageCircle" ? (
                    <MessageCircle strokeWidth={1} />
                ) : (
                    <Bookmark strokeWidth={1} />
                )}
            </Button>
            {numberOfLikes}
        </>
    );
};
export default ButtonInfo;
