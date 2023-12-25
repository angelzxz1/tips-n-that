import { PostTag } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const ListTags = ({ tags }: { tags: PostTag[] }) => {
    if (tags.length === 0) {
        return (
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="- No tags available -" />
                </SelectTrigger>
                <SelectContent></SelectContent>
            </Select>
        );
    }
    return (
        <Select>
            <SelectTrigger className="">
                <SelectValue placeholder="- Select a Tag -" />
            </SelectTrigger>
            <SelectContent>
                {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export type ListTagsType = typeof ListTags;
