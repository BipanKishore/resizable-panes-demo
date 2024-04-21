
"use client"
import React from 'react'
import {
    Pane, ResizablePanes
} from 'resizable-panes-react'

export default function VerticalPanes() {

    const pane1 = 'pane1'
    const pane2 = 'pane2'
    const pane3 = 'pane3'
    return (
        <ResizablePanes
            uniqueId="horizontally-doc"
            unit='ratio'
        >
            <ResizablePanes
                className=''
                uniqueId='vertical-pane-1'
                unit='ratio'
                vertical
            >
                <Pane className={pane1} id={pane1} minSize={3} size={30}>
                </Pane>

                <Pane
                    className={pane2} id={pane2} minSize={4} size={40}
                >
                </Pane>

                <Pane className={pane3} id={pane3} minSize={3} size={30}>
                </Pane>
            </ResizablePanes>

        </ResizablePanes>
    )

}