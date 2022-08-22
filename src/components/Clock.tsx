import { useEffect, useState } from "react";
import Block from "./Block";

var interval: number | undefined;

export default function Clock() {
    const [date, setDate] = useState(new Date());

    function update() {
        setDate(new Date());
    }

    useEffect(() => {
        interval = setInterval(update, 100/6);

        return () => {
            clearInterval(interval);
        }
    }, [])
    
    return (
        <Block className="w-33 d-flex justify-content-center align-items-center flex-column" >
            <h1 style={{background: `linear-gradient(90deg, )`}} >{date.toLocaleString('default', {hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"})}</h1>
            <h3>{date.toLocaleString('default', {month: "long", day: "numeric", weekday: "short", year: "numeric"})}</h3>
        </Block>
    )

}