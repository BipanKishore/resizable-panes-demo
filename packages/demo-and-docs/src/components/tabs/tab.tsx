import React from "react";


export interface ITabProps {
    active: boolean,
    text: string,
    onClick?: any
}


export const Tab = (props: ITabProps) => {

    const {active, text, onClick} =props

    const className = active ? 'tab tab-active' : 'tab'

    return (
        <div 
            onClick={() => onClick(text)} 
            className={className}>
            {text}
        </div>
    )
}