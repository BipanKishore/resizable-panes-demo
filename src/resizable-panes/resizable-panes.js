import './style.css'

import PropTypes from 'prop-types'
import React, {
    cloneElement,
    createRef, useCallback, useEffect, useMemo, useRef
} from 'react'

import panesService from './pane-service'
import {Resizer} from './resizer'

export const ResizablePanes = (props) => {
    console.log('rerender')
    const {
        children, resizerSize, onReady
    } = props

    const containerRef = createRef()
    const panesRefs = useRef([
    ])
    panesRefs.current = children.map((_, i) => panesRefs.current[i] ?? createRef())

    useEffect(() => {

        panesService.initPanesService({
            children,
            containerRef,
            panesRefs,
            resizerSize
        })

        if(onReady) {
            onReady(panesService)
        }
    }, [
        onReady, resizerSize, containerRef, panesRefs, children
    ])

    const onMouseMove = useCallback((e) => {
        panesService.calculateAndSetHeight(e)
    }, [
    ])

    const onMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', onMouseMove)
    }, [
        onMouseMove
    ])

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUp)
        return () => document.removeEventListener('mouseup', onMouseUp)
    }, [
        onMouseUp
    ])

    const onMouseDown = useCallback((e, index) => {
        console.log(index)
        panesService.setActiveIndex(index)
        panesService.setMouseDownAndPaneAxisDetails(e)
        document.addEventListener('mousemove', onMouseMove)
    }, [
        onMouseMove
    ])

    const contentJsx = useMemo(() => {
        const content = [
        ]

        let i = 0
        let key
        for ( ;i < children.length - 1; i += 1) {
            const iCopy = i
            key = children[iCopy].props.id
            content.push(cloneElement(children[iCopy], {
                key,
                ref: panesRefs.current[iCopy]
            }))

            content.push(
                <Resizer
                    key={`${key}-resizer`}
                    resizerSize={resizerSize}
                    onMouseDown={(e) => onMouseDown(e, iCopy)}
                />
            )
        }

        content.push(cloneElement(children[i], {
            key: children[i].props.id,
            ref: panesRefs.current[i]
        }))
        return content
    }, [
        children, onMouseDown, resizerSize
    ])

    return (
        <div
            className='pane-container bg-lightblue'
            ref={containerRef}
        >
            {contentJsx}
        </div>
    )
}

ResizablePanes.propTypes = {

    children: PropTypes.any.isRequired,
    onReady: PropTypes.func,
    resizerSize: PropTypes.number.isRequired
}
