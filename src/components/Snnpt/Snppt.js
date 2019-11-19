import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";

export default function Snnpt(props){

    useEffect(() => {
        Prism.highlightAll();
    }, [])

    return(
        <div>
            <pre>
                <code className="language-javascript">
                    {`
    onSubmit(e) {
        e.preventDefault();
        const job = {
            title: 'Developer',
            company: 'Facebook' 
        };
    }
                    `}
                </code>
            </pre>
        </div>
    )
}



