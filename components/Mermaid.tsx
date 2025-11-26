"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
});

export function Mermaid({ code }: { code: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (ref.current) {
            const id = `mermaid-${Date.now()}`;
            mermaid
                .render(id, code)
                .then((result) => {
                    setSvg(result.svg);
                    setError("");
                })
                .catch((err) => {
                    console.error("Mermaid render error:", err);
                    setError("Failed to render diagram");
                });
        }
    }, [code]);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div
            ref={ref}
            className="mermaid flex justify-center p-4 bg-white rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
