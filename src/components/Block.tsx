import React from "react";

export default function Block({ children, className, ...rest}: {children: React.ReactNode, className: string}) {
    return (
        <div className={`block p-4 border ${className}`} {...rest} >
            {children}
        </div>
    )
}