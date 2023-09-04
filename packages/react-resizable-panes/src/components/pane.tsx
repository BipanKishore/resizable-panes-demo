import PropTypes from 'prop-types'
import React, {
  forwardRef, useEffect, useState
} from 'react'

import {subscription} from '../services/subscription'
import {toPx} from '../utils/util'


interface IPane {
  className: string,
  children: any[], 
  id: string, 
  size: number
}


function Pane (props: IPane, ref: any) {
  const {

    // eslint-disable-next-line react/prop-types
    className, children, id, size
  } = props

  const [
    state, setState
  ] = useState<any>()

  useEffect(() => {
    subscription.subscribe(id, ({
      size, maxSize, minSize, axisSize, axisCoordinate,
      finalChange, left
    }: any) => {
      setState({
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
    size: currentSize, minSize, maxSize, axisSize, mouseCoordinate, axisCoordinate, finalChange, left
  }: any = state || {
  }

  return (
    <div
      className={className} id={id} ref={ref} style={{
        height: toPx(size)
      }}
    >
      <div>
        <span>axisCoordinate: {axisCoordinate}</span> {', '}
        <span>mouseCoordinate: {mouseCoordinate}</span> {', '}
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

const abc = 6
console.log(abc)
