import React from "react";
import SVG from 'react-inlinesvg';




export const ResizerNode1 = (prop: any) => {
    return (
        <SVG
        {...prop}
        src="https://cdn.svgporn.com/logos/react.svg"
        width={20}
        height="auto"
        />
    )
}