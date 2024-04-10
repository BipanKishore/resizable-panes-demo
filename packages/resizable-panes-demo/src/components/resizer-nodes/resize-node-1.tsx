import React from 'react'
import SVG from 'react-inlinesvg'

export const ResizerNode1 = (prop: any) => {
  return (
    <SVG
      {...prop}
      height="auto"
      src="https://cdn.svgporn.com/logos/react.svg"
      width={20}
    />
  )
}
