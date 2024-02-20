"use client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import type { sampleType } from "@/app/api/test/route";
const TestPage = () => {
    const [Component, setComponent] = useState<JSX.Element>();
    useEffect(() => {
        axios.get<sampleType>("/api/test").then((res) => {
            console.log(typeof (<div>Sample Component</div>));
            console.log(typeof res.data.component);
            const component = res.data.component;
            setComponent(res.data.component as JSX.Element);
        });
    }, []);
    return (
        <div className="pt-32 ">
            {Component ? (
                (Component as JSX.Element)
            ) : (
                <Loader className="animate-spin" />
            )}
        </div>
    );
};

export default TestPage;
