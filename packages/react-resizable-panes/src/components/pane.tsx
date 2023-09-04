import PropTypes from 'prop-types'
import React, {
  forwardRef, useEffect, useMemo, useState
} from 'react'

import {subscription} from '../services/subscription'
import { SplitType } from '../@types'
import { getSizeStyle } from '../utils/new-util'


interface IPane {
  className: string,
  children: any[], 
  id: string, 
  size: number,
  split: SplitType
}


function Pane (props: IPane, ref: any) {
  const {

    // eslint-disable-next-line react/prop-types
    className, children, id, size,
    split
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



  const style = useMemo(
                  () => getSizeStyle(split, size),
                  [split, size])

  return (
    <div
      className={className} 
      id={id} 
      ref={ref} 
      style={style}
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

export default forwardRef(Pane)

