
"use client"
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'
import React from 'react'
import {
    Panes, ResizablePanes
} from 'resizable-panes-react'

export default function HorizantalPanes() {
    return (
        <ResizablePanes
            uniqueId="horizontally-doc"
            unit='ratio'
        >
            <Panes className={ODD_PANE_CLASS} id='P0' minSize={10} size={50}>
            </Panes>

            <Panes className={EVEN_PANE_CLASS} id='P1' minSize={10} size={50}>
            </Panes>

        </ResizablePanes>
    )
}