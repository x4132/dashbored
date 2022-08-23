import React from "react";

interface BlockType extends React.HTMLAttributes<HTMLDivElement> {}

export default function Block({ children, className, ...rest }: BlockType) {
    return (
        <div className={`block p-2 m-1 border ${className}`} {...rest} >
            {children}
        </div>
    )
}