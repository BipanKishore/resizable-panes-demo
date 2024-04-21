
"use client"
import React from 'react'
import {
    Panes, ResizablePanes
} from 'resizable-panes-react'

export default function HorizantalPanes() {

    const pane2 = 'pane2'
    const pane3 = 'pane3'
    return (
        <ResizablePanes
            uniqueId="horizontally-doc"
            unit='ratio'
        >
            <Panes className={pane2} id={pane2} minSize={10} size={50}>
            </Panes>

            <Panes className={pane3} id={pane3} minSize={10} size={50}>
            </Panes>

        </ResizablePanes>
    )

}