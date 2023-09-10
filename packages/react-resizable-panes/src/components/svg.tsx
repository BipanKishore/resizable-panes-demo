import React from 'react'
import compress from '../../assets/icons/compress.svg'

interface ISvg {
    name: string
    className?: string,
    onClick?: (e:any) => void
}

const SVG_LIST: any = {
  compress
}

export const Svg = (props: ISvg) => {
  const {name, className, onClick} = props

  const svgData = SVG_LIST[name]

  return <span onClick={onClick} > {name}</span>

//   const svgJsx = (<use
//     xlinkHref={svgData}
//                   />)
//   return (
//     <svg
//       className={className}
//       onClick={onClick}
//     >
//       <use></use>
//     </svg>
//   )
}
