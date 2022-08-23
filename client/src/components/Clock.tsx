import { useEffect, useState } from "react";
import Block from "./Block";

var interval: number | undefined;

export default function Clock() {
    const [date, setDate] = useState(new Date());

    function update() {
        setDate(new Date());
    }

    useEffect(() => {
        interval = setInterval(update, 100 / 6);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (/*style={{background: `linear-gradient(90deg, #f8f9fa 50%, #212529 50%)`, color: `#f8f9fa` }}*/
        <Block className="w-33 d-flex justify-content-center align-items-center flex-column" >
            <h1>{date.toLocaleString('default', { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" })}</h1>
            <h3>{date.toLocaleString('default', { month: "long", day: "numeric", weekday: "short", year: "numeric" })}</h3>
        </Block>
    )

}