import React from 'react'
interface IMinMaxViewerProps{

            maxSize:number,
            minSize:number,
            size:number
}

const MinMaxViewer = (props:IMinMaxViewerProps) => {
  const {maxSize, minSize, size = 0} = props
  let maxSizeClass = ''
  let minSizeClass = ''
  if (size >= maxSize) {
    maxSizeClass = 'color-red'
  }
  if (size <= minSize) {
    minSizeClass = 'color-red'
  }
  return (
    <div className="maxxmin">
      <span className={minSizeClass}>{minSize}</span><br />
      <span >{size.toFixed(1)}  </span><br />
      <span className={maxSizeClass} >{maxSize}</span>
    </div>
  )
}

export default MinMaxViewer
