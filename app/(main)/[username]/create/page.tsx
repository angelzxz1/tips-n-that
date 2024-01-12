import { db } from "@/lib/db";
import FormSection from "./form-section";

export default async function CreatePost() {
    const tags = await db.postTag.findMany();

    return <FormSection tags={tags} />;
}
