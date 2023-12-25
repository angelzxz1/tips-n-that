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
import { Loader } from "lucide-react";
import { ListTags } from "@/components/list-tags";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
    post: z.string().min(1),
    tagId: z.string(),
});

export default function FormSection({ tags }: { tags: PostTag[] }) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            post: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        alert("test");
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
        <div className="w-full h-full flex justify-center items-center gap-4 px-4">
            <div className="h-3/4 w-2/3 border shadow-xl rounded-lg dakr:bg-white/5 bg-black/10 flex flex-wrap">
                <ScrollArea className="w-full h-full">
                    <Markdown
                        className="p-4 w-full h-full"
                        remarkPlugins={[remarkGfm]}
                    >
                        {form.watch("post")}
                    </Markdown>
                </ScrollArea>
            </div>
            <div className="h-3/4 w-1/3 border shadow-xl rounded-lg bg-white/5 flex flex-wrap">
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
