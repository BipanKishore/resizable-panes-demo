
"use client"
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'
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
                <Pane className={ODD_PANE_CLASS} id='P0' minSize={3} size={30}>
                </Pane>

                <Pane className={EVEN_PANE_CLASS} id='P1' minSize={4} size={40}
                >
                </Pane>

                <Pane className={ODD_PANE_CLASS} id='P2' minSize={3} size={30}>
                </Pane>
            </ResizablePanes>

        </ResizablePanes>
    )

}