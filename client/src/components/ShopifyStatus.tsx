import React, { useEffect, useState } from "react";
import Block from "./Block";

var intervalId: number | undefined;

export default function ShopifyStatus() {
    const [items, setItems] = useState<React.ReactNode[]>();

    async function dataProcess() {
        let data = await loadStatusData();
        let result: React.ReactNode[] = [];

        data.forEach((i: any) => {
            result.push(<StatusDOM label={i.label} state={i.state} key={i.label} />)
        })

        setItems(result);
    }


    useEffect(() => {
        intervalId = setInterval(() => dataProcess(), 5000);

        dataProcess();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Block className="w-33 row row-cols-2" >
            <div className="w-100 text-center" >
                <h4>Shopify Status</h4>
            </div>
            {items}
        </Block>
    )
}

function StatusDOM({ label, state }: { label: string, state: string }) {
    return (
        <div className="col d-flex align-items-center">
            <h6>{label}: <span className={`${state === "Operational" ? `text-success` : `text-danger`}`} >{state}</span></h6>
        </div>
    )
}

async function loadStatusData() {
    let result = await (await fetch("/api/shopifystatus")).json();

    return result;
}