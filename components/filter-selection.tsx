"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const FilterSelection = ({
    listItems,
    placeholder,
}: {
    listItems: { name: string; item: any }[];
    placeholder: string;
}) => {
    const [Filter, setFilter] =
        useState<{ name: string; item: any }[]>(listItems);
    const [filterValue, setFilterValue] = useState("");
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="relative">
                <Input
                    value={filterValue}
                    placeholder="Filter"
                    onChange={(e) => {
                        setFilterValue(() => {
                            setFilter(
                                listItems.filter((item) =>
                                    item.name
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                )
                            );
                            return e.target.value;
                        });
                    }}
                    className="fixed top-0 left-0 w-full z-10 bg-black rounded-none border-b"
                />
                <SelectGroup className="mt-8">
                    {Filter.map((item) => (
                        <SelectItem
                            key={item.name}
                            value={item.item}
                            onClick={() => {
                                setFilterValue("");
                            }}
                        >
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
