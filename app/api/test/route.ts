import { NextRequest, NextResponse } from "next/server";
import { SampleComponent } from "@/components/server/test";
export type sampleType = {
    sample: string;
    ip: string | undefined;
    component: JSX.Element;
};
export async function GET(req: NextRequest, res: NextResponse) {
    const ip =
        req.headers.get("x-real-ip") ||
        req.headers.get("x-forwarded-for") ||
        req.ip;
    const response = {
        sample: "Sample Component",
        ip,
        component: SampleComponent(),
    };
    return NextResponse.json<sampleType>(response);
}
