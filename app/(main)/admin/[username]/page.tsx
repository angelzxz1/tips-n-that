"use client";
import { CreateTag, DeleteTag, EditTag } from "@/components/admin/tags";
import { FilterSelection } from "@/components/filter-selection";
import { Button } from "@/components/ui/button";
import { testArray } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
const AdminPage = ({ params }: { params: { username: string } }) => {
    const [loading, setLoading] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [showTabTags, setShowTabTags] = useState("create");
    const [showTabUser, setShowTabUser] = useState("edit");
    const arr = testArray();
    const query = qs.stringifyUrl({
        url: "/api/admin",
        query: {
            username: params.username,
        },
    });
    axios
        .get(query)
        .then((res) => {
            setIsLogedIn(true);
        })
        .catch((err: AxiosError) => {
            if (err.response?.status === 404) {
                setIsLogedIn(false);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    if (loading)
        return (
            <div className="h-full w-full flex items-center justify-center">
                Loading...
            </div>
        );
    if (!isLogedIn)
        return (
            <div className="h-full w-full flex items-center justify-center">
                Looks like you don&apos;t have permission to access here :/
            </div>
        );
    return (
        <div className="h-full w-full grid-rows-2 grid grid-cols-2 gap-4 justify-center">
            <div className="flex flex-1 flex-col items-center row-span-1">
                <div className="w-full px-2 mt-2 h-fit">
                    <Button
                        onClick={() => setShowTabTags("create")}
                        variant={showTabTags === "create" ? "tab" : "noneTab"}
                    >
                        Create Tag
                    </Button>
                    <Button
                        onClick={() => setShowTabTags("edit")}
                        variant={showTabTags === "edit" ? "tab" : "noneTab"}
                    >
                        Edit Tag
                    </Button>
                    <Button
                        onClick={() => setShowTabTags("delete")}
                        variant={showTabTags === "delete" ? "tab" : "noneTab"}
                    >
                        Delete Tag
                    </Button>
                </div>
                <div className="flex-1 w-full border-primary/90 border flex items-center justify-center flex-col rounded-lg">
                    {
                        {
                            create: <CreateTag />,
                            edit: <EditTag />,
                            delete: <DeleteTag />,
                        }[showTabTags]
                    }
                </div>
            </div>
            <div className="flex flex-1 flex-col items-center row-span-1">
                <div className="w-full px-2 mt-2 h-fit">
                    <Button
                        onClick={() => setShowTabUser("edit")}
                        variant={showTabUser === "edit" ? "tab" : "noneTab"}
                    >
                        Edit user
                    </Button>
                    <Button
                        onClick={() => setShowTabUser("delete")}
                        variant={showTabUser === "delete" ? "tab" : "noneTab"}
                    >
                        Delete user
                    </Button>
                </div>
                <div className="flex-1 w-full border-primary/90 border flex items-center justify-center flex-col rounded-lg">
                    {
                        {
                            edit: <EditTag />,
                            delete: <DeleteTag />,
                        }[showTabUser]
                    }
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center  row-start-2 col-span-2">
                <FilterSelection
                    listItems={arr}
                    placeholder="-Select an account to administrate-"
                />
            </div>
        </div>
    );
};

export default AdminPage;
