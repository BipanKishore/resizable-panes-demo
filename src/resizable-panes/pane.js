import PropTypes from 'prop-types'
import React, {
  forwardRef, useEffect, useState
} from 'react'

import {subscription} from './subscription'
import {toPx} from './util'

function Pane (props, ref) {
  const {

    // eslint-disable-next-line react/prop-types
    className, children, id, size
  } = props

  const [
    state, setState
  ] = useState()

  useEffect(() => {
    subscription.subscribe(id, ({
      size, maxSize, minSize, axisSize, Y, axisCoordinate,
      finalChange, left
    }) => {
      setState({
        Y,
        axisCoordinate,
        axisSize,
        finalChange,
        left,
        maxSize,
        minSize,
        size
      })
    })

    return () => subscription.unSubscribe(id)
  }, [
    setState, id
  ])

  const {
    size: currentSize, minSize, maxSize, axisSize, Y, axisCoordinate, finalChange, left
  } = state || {
  }

  return (
    <div
      className={className} id={id} ref={ref} style={{
        height: toPx(size)
      }}
    >
      <div>
        <span>axisCoordinate: {axisCoordinate}</span> {', '}
        <span>Y: {Y}</span> {', '}
        <span>axisSize: {axisSize}</span> {', '}
        <span>size: {currentSize}</span> {', '}
        <span>minSize: {minSize}</span> {', '}
        <span>maxSize: {maxSize}</span> {', '}
        <span>left: {left}</span> {', '}
        <span>finalChange: {finalChange}</span> {', '}

      </div>
      {/* {children} */}
    </div>
  )
}

Pane.prototypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  size: PropTypes.number
}

export default forwardRef(Pane)
