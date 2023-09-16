import React from 'react'
interface IMinMaxViewerProps{

            maxSize:number,
            minSize:number,
            size:number
}

const MinMaxViewer = (props:IMinMaxViewerProps) => {
  const {maxSize, minSize, size = 0} = props
  return (
    <div className="maxxmin">
      <span>{minSize}</span><br />
      <span >{size.toFixed(1)}  </span><br />
      <span>{maxSize}</span>
    </div>
  )
}

export default MinMaxViewer
