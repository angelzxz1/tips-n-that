"use client";
import axios from "axios";
const TestPage = () => {
    axios
        .get("/api/user", { params: { id: "1235" } })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.clear();
            console.log(
                "-----------------------------------------------------------"
            );
            console.log("Hubo un error");
        });
    return (
        <div className="pt-32">
            {}
            <h1>Test</h1>
        </div>
    );
};

export default TestPage;
