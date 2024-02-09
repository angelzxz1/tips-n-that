"use client";

import { set, z } from "zod";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import qs from "query-string";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
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
import { PostTag } from "@prisma/client";
import { Loader } from "lucide-react";

const CreateTagSchema = z.object({
    tagName: z.string().min(2).max(50).toLowerCase(),
});
const EditTagSchema = z.object({
    tagName: z.string().min(2).max(50),
});
const DeleteTagSchema = z.object({
    tagName: z.string().min(2).max(50),
});

export const CreateTag = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof CreateTagSchema>>({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: {
            tagName: "",
        },
    });
    async function onSubmit(values: z.infer<typeof CreateTagSchema>) {
        try {
            setLoading(true);
            const newValues: z.infer<typeof CreateTagSchema> = {
                tagName: values.tagName
                    .replace(/[^a-zA-Z0-9 ]+/g, "")
                    .replace(/\s+/g, "-"),
            };
            const res = await axios.post("/api/admin/tags", newValues);
            console.log(res);
            form.reset();
        } catch (error) {
            const { response } = error as AxiosError;
            alert(response?.data);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-4/5 border rounded-md shadow-lg shadow-black/40 p-4 flex gap-4 flex-wrap"
            >
                <div className="w-full ">Create Tag</div>
                <FormField
                    control={form.control}
                    name="tagName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Tag Name"
                                    className="w-full border border-white/10 p-4 rounded-lg resize-none dark:bg-white/5 bg-white dark:text-white/90 h-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end items-center ">
                    <Button
                        type="submit"
                        disabled={loading || form.getValues().tagName !== ""}
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
    );
};
export const EditTag = () => {
    const [tagList, setTagList] = useState<PostTag[] | undefined>();
    const [selectedTag, setSelectedTag] = useState<PostTag>();
    const [isTagSelected, setIsTagSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof EditTagSchema>>({
        resolver: zodResolver(EditTagSchema),
        defaultValues: {
            tagName: "",
        },
    });
    useEffect(() => {
        axios
            .get("/api/tags")
            .then((res) => {
                setTagList(res.data.tags);
                console.log("llamado");
            })
            .catch((err: AxiosError) => {
                console.log(err);
            })
            .finally(() => {});
    }, [form, selectedTag, loading]);
    async function onSubmit(values: z.infer<typeof EditTagSchema>) {
        try {
            setLoading(true);
            await axios.patch("/api/admin/tags", {
                ...values,
                id: selectedTag?.id,
            });
            form.reset();
        } catch (error) {
            console.log((error as AxiosError)?.request?.response);
        } finally {
            setLoading(false);
            setIsTagSelected(false);
        }
    }
    if (!tagList)
        return (
            <div className="w-4/5 border rounded-md shadow-lg shadow-black/40 p-4 flex gap-4 flex-wrap">
                <div className="h-6 w-full " />
                <div className="w-full animate-pulse h-[54px] dark:bg-white/10 bg-white dark:text-white/90 rounded-md" />
                <div className="w-full animate-pulse h-[54px] dark:bg-white/5 bg-white dark:text-white/90 rounded-md" />
                <div className="w-full flex justify-end items-center ">
                    <div className="animate-pulse h-9 text-transparent bg-primary rounded-md">
                        Save changes
                    </div>
                </div>
            </div>
        );
    return (
        <div className="w-4/5 border rounded-md shadow-lg shadow-black/40 p-4 flex gap-4 flex-wrap">
            <div className="w-full ">Rename Tag</div>
            <div className="flex w-full">
                <Select
                    onValueChange={(e) => {
                        form.setValue("tagName", e);
                        setSelectedTag(tagList.find((tag) => tag.name === e));
                        setIsTagSelected(true);
                    }}
                >
                    <SelectTrigger className=" w-full border border-white/10 rounded-lg p-4 resize-none dark:bg-white/10 bg-white dark:text-white/90 h-full">
                        <SelectValue placeholder="-Select a Tag to rename-" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        {tagList.map((tag) => (
                            <SelectItem
                                value={tag.name}
                                key={tag.id}
                                className="w-full "
                            >
                                {tag.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="tagName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!isTagSelected}
                                        placeholder={selectedTag?.name}
                                        className="border border-white/10 rounded-lg p-4 resize-none dark:bg-white/5 bg-white dark:text-white/90 h-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-end items-center mt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
export const DeleteTag = () => {
    const [tagList, setTagList] = useState<PostTag[] | undefined>();
    const [selectedTag, setSelectedTag] = useState<PostTag>();
    const [isTagSelected, setIsTagSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof DeleteTagSchema>>({
        resolver: zodResolver(DeleteTagSchema),
        defaultValues: {
            tagName: "",
        },
    });
    useEffect(() => {
        axios
            .get("/api/tags")
            .then((res) => {
                setTagList(res.data.tags);
            })
            .catch((err: AxiosError) => {
                console.log(err);
            })
            .finally(() => {});
    }, [form, selectedTag, loading]);
    async function onSubmit(values: z.infer<typeof DeleteTagSchema>) {
        try {
            setLoading(true);
            await axios.delete("/api/admin/tags", {
                ...values,
                id: selectedTag?.id,
            } as AxiosRequestConfig);
            form.reset();
        } catch (error) {
            console.log((error as AxiosError)?.request?.response);
        } finally {
            setLoading(false);
            setIsTagSelected(false);
        }
    }
    if (!tagList)
        return (
            <div className="w-4/5 border rounded-md shadow-lg shadow-black/40 p-4 flex gap-4 flex-wrap">
                <div className="h-6 w-full " />
                <div className="w-full animate-pulse h-[54px] dark:bg-white/10 bg-white dark:text-white/90 rounded-md" />
                <div className="w-full animate-pulse h-[54px] dark:bg-white/5 bg-white dark:text-white/90 rounded-md" />
                <div className="w-full flex justify-end items-center ">
                    <div className="animate-pulse h-9 text-transparent bg-primary rounded-md">
                        Save changes
                    </div>
                </div>
            </div>
        );
    return (
        <div className="w-4/5 border rounded-md shadow-lg shadow-black/40 p-4 flex gap-4 flex-wrap">
            <div className="w-full ">Delete Tag</div>
            <div className="flex w-full">
                <Select
                    onValueChange={(e) => {
                        form.setValue("tagName", e);
                        setSelectedTag(tagList.find((tag) => tag.name === e));
                        setIsTagSelected(true);
                    }}
                >
                    <SelectTrigger className=" w-full border border-white/10 rounded-lg p-4 resize-none dark:bg-white/10 bg-white dark:text-white/90 h-full">
                        <SelectValue placeholder="-Select a Tag to delete-" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        {tagList.map((tag) => (
                            <SelectItem
                                value={tag.name}
                                key={tag.id}
                                className="w-full "
                            >
                                {tag.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="tagName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!isTagSelected}
                                        placeholder={selectedTag?.name}
                                        className="border border-white/10 rounded-lg p-4 resize-none dark:bg-white/5 bg-white dark:text-white/90 h-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-end items-center mt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
