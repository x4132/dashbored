import Block from "./Block";
import { useEffect, useState } from "react";

var intervalId: number;

export default function System() {
    const [info, setInfo] = useState<any>({});

    async function processData() {
        var sysinfo = await (await fetch("/api/sysinfo")).json()
        console.log(sysinfo);
        setInfo(sysinfo);
    }

    useEffect(() => {
        intervalId = setInterval(() => processData(), 1000);

        processData();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Block className="w-33" >
            <div className="w-100 text-center" >
                <h4>{info.hostname ? info.hostname : "System"} Info</h4>
            </div>

            <div className="row">
                <StatusDOM>
                    <h6>CPU: {info.cpu}%</h6>
                </StatusDOM>

                <StatusDOM>
                    <h6>RAM: {info.mem?.usedMemPercentage}% Used, {Math.round(info.mem?.usedMemMb / 10) / 100}/{Math.round(info.mem?.totalMemMb / 10) / 100}GB Free</h6>
                </StatusDOM>
            </div>
        </Block>
    )
}

function StatusDOM({ children }: { children: React.ReactNode }) {
    return (
        <div className="col d-flex align-items-center">
            {children}
        </div>
    )
}