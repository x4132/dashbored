import React, { useEffect, useState } from "react";
import Block from "./Block";

var intervalId: number;

export default function InternetStatus() {
    const [amazonStatus, setAmazonStatus] = useState<boolean>();

    async function processData() {
        var amazonData = await (await fetch("/api/amazonstatus")).json()
        if (amazonData.length > 0) {
            setAmazonStatus(false)
        } else {
            setAmazonStatus(true);
        }
    }

    useEffect(() => {
        intervalId = setInterval(() => processData(), 5000);

        processData();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Block className="w-33" >
            <div className="w-100 text-center" >
                <h4>Internet Status</h4>
            </div>

            <div className="row" >
                <StatusDOM>
                    <h6>Amazon: <span className={`${amazonStatus ? `text-success` : `text-danger`}`} >{amazonStatus ? "Operational" : "Incident"}</span></h6>
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