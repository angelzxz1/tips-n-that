"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Comment } from "@prisma/client";
import LoadComments from "./load-comments";

const formSchema = z.object({
    comment: z.string().min(2).max(500),
});
const Comments = ({
    postId,
    userImageUrl,
    comments,
}: {
    postId: string;
    userImageUrl: string | null;
    comments: Comment[];
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post("/api/myPosts/comment", {
                postId,
                ...values,
            });
            console.log(res.data.message);
            // console.log(typeof res.data.commentRes.createdAt);
            setCommentList([...commentList, res.data.commentRes]);
            setLoading(false);
            form.reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="w-full flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src={userImageUrl || "/user.svg"}
                        alt="user"
                        className="w-full h-full object-cover"
                        height={48}
                        width={48}
                    />{" "}
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-wrap gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us what you think!"
                                            {...field}
                                            className="w-full dark:border-white/10"
                                            id="comment"
                                            rows={10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
            <LoadComments comments={commentList} />
        </>
    );
};

export default Comments;
