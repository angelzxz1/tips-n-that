"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PostTag } from "@prisma/client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useState } from "react";
import { ArrowDown, ArrowUp, Grip, Loader } from "lucide-react";
import { ListTags } from "@/components/list-tags";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// This function will receive 2 arguments, and will toggle the state of the button
//

const formSchema = z.object({
    post: z.string().min(1),
    tagId: z.string(),
});

export default function FormSection({ tags }: { tags: PostTag[] }) {
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState<"top" | "mid" | "bot">("mid");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            post: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            console.log(values);
            const status = await axios.post("/api/myPosts/create", values);
            console.log(status);
            form.reset();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                w-full h-full flex justify-center items-center gap-4 px-4 pt-20
                flex-col lg:flex-row
                relative
            "
        >
            <div className="absolute right-0 bg-indigo-800 z-50 p-2 rounded-full lg:hidden grid place-items-center gap-2 ">
                <ArrowUp onClick={() => setToggle("top")} />
                <Grip onClick={() => setToggle("mid")} />
                <ArrowDown onClick={() => setToggle("bot")} />
            </div>
            <div
                className={cn(
                    `
                    lg:h-3/4 lg:w-2/3
                    h-full w-full
                    border shadow-xl rounded-lg dakr:bg-white/5 bg-black/10 flex flex-wrap
                    transition-all
                `,
                    toggle === "bot" || toggle === "mid" ? "h-full" : "h-0"
                )}
            >
                <ScrollArea className="w-full h-full">
                    <Markdown
                        className="p-4 w-full h-full"
                        remarkPlugins={[remarkGfm]}
                    >
                        {form.watch("post")}
                    </Markdown>
                </ScrollArea>
            </div>
            <div
                className={cn(
                    `
                    lg:h-3/4 lg:w-1/2
                    h-full w-full
                    border shadow-xl rounded-lg bg-white/5 flex flex-wrap
                    transition-all
                `,
                    toggle === "top" || toggle === "mid" ? "h-full" : "h-0"
                )}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="h-full w-full relative flex flex-col"
                        id="create-post-form"
                    >
                        <FormField
                            control={form.control}
                            name="post"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full ">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type here..."
                                            className="border border-white/10 rounded-lg p-4 resize-none dark:bg-black/50 bg-indigo-900/50 dark:text-white/90 h-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end items-center w-full bottom-2 gap-4 p-4 z-50">
                            <FormField
                                control={form.control}
                                name="tagId"
                                render={({ field }) => (
                                    <FormItem className="flex-1 w-full ">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="- Select a Tag -" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tags.map((tag) => (
                                                        <SelectItem
                                                            key={tag.id}
                                                            value={tag.id}
                                                        >
                                                            {tag.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                {loading ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
