import Block from "./Block";
import { useEffect, useState } from "react";

var intervalId: number;

export default function System() {
    const [info, setInfo] = useState<any>({});

    async function processData() {
        var sysinfo = await (await fetch("/api/sysinfo")).json()
        setInfo(sysinfo);
    }

    useEffect(() => {
        intervalId = setInterval(() => processData(), 5000);

        processData();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Block className="w-33" >
            <div className="w-100 text-center" >
                <h4>{info.hostname ? info.hostname : "System Info"} Info</h4>
            </div>
        </Block>
    )
}