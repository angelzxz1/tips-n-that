"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

const Icon = ({ Icon }: { Icon: "Heart" | "MessageCircle" | "Bookmark" }) => {
    if (Icon === "Heart") return <Heart strokeWidth={1} />;
    if (Icon === "MessageCircle") return <MessageCircle strokeWidth={1} />;
    return <Bookmark strokeWidth={1} />;
};

const ButtonInfo = ({
    userId,
    postId,
    likeId,
    Icon,
    IconClass = "",
    value,
}: {
    userId: string | undefined;
    postId: string;
    likeId: string | undefined;
    Icon: "Heart" | "MessageCircle" | "Bookmark";
    IconClass?: string;
    value: number;
}) => {
    const [amount, setAmount] = useState<number>(value);
    const [clicable, setClicable] = useState<boolean>(true);
    const [iLikedIt, setILikedIt] = useState<boolean>(!!likeId);
    const [newLikeID, setNewLikeID] = useState<string | undefined>(likeId);
    if (!userId) {
        return (
            <>
                <div>
                    {Icon === "Heart" ? (
                        <Heart strokeWidth={1} className={cn(IconClass)} />
                    ) : Icon === "MessageCircle" ? (
                        <MessageCircle
                            strokeWidth={1}
                            className={cn(IconClass)}
                        />
                    ) : (
                        <Bookmark strokeWidth={1} className={cn(IconClass)} />
                    )}
                </div>
                {amount}
            </>
        );
    }
    if (iLikedIt)
        return (
            <>
                <Button
                    variant={"none"}
                    size={"none"}
                    disabled={!clicable}
                    onClick={async () => {
                        if (!clicable || !newLikeID) return;
                        setClicable(false);
                        try {
                            setILikedIt(false);
                            setAmount((amount) => amount - 1);
                            const res = await axios.delete(
                                "/api/myPosts/like",
                                {
                                    data: {
                                        LikeId: newLikeID,
                                        postId,
                                    },
                                }
                            );
                            setNewLikeID(undefined);
                            setClicable(!!res);
                        } catch (error) {
                            setILikedIt(false);
                            setClicable(true);
                        }
                    }}
                >
                    {Icon === "Heart" ? (
                        <Heart
                            strokeWidth={1}
                            className={cn(
                                IconClass,
                                "cursor-pointer text-red-500"
                            )}
                        />
                    ) : Icon === "MessageCircle" ? (
                        <MessageCircle
                            strokeWidth={1}
                            className={cn(IconClass)}
                        />
                    ) : (
                        <Bookmark strokeWidth={1} className={cn(IconClass)} />
                    )}
                </Button>
                {amount}
            </>
        );
    return (
        <>
            <Button
                variant={"none"}
                size={"none"}
                disabled={!clicable}
                onClick={async () => {
                    if (!clicable) return;
                    setClicable(false);
                    try {
                        setILikedIt(true);
                        setAmount((amount) => amount + 1);
                        const res = await axios.post("/api/myPosts/like", {
                            postId,
                        });
                        setNewLikeID(res.data.likeRes.id);
                        setClicable(!!res);
                    } catch (error) {
                        setILikedIt(true);
                        setClicable(true);
                    }
                }}
            >
                {Icon === "Heart" ? (
                    <Heart
                        strokeWidth={1}
                        className={cn(IconClass, "cursor-pointer")}
                    />
                ) : Icon === "MessageCircle" ? (
                    <MessageCircle strokeWidth={1} className={cn(IconClass)} />
                ) : (
                    <Bookmark strokeWidth={1} className={cn(IconClass)} />
                )}
            </Button>
            {amount}
        </>
    );
};

export default ButtonInfo;

const value = !!undefined;
