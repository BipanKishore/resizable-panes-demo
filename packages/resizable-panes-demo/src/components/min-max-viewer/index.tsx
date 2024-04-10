import React from 'react'

interface IMinMaxViewerProps{
  maxSizes:any,
  minSizes:any,
  sizes:any,
  id: string
}

// eslint-disable-next-line complexity
const MinMaxViewer = (props:IMinMaxViewerProps) => {
  const {maxSizes, minSizes, sizes, id} = props
  const minSize = (minSizes[id] as number) ?? 0
  const size = (sizes[id] as number) ?? 0
  const maxSize = (maxSizes[id] as number) ?? 0
  let maxSizeClass = ''
  let minSizeClass = ''
  if (size >= maxSize) {
    maxSizeClass = 'max-limit-reached'
  }
  if (size <= minSize) {
    minSizeClass = 'min-limit-reached'
  }

  return (
    <div className='d-flex jc-center ai-center h-100p w-100p'>
      <div className=" f-size-16 f-weight-500 font-tabular-nums">
        <span className={minSizeClass}>{minSize}</span><br />
        <span >{size.toFixed(0)}  </span><br />
        <span className={maxSizeClass} >{maxSize}</span>
      </div>
    </div>
  )
}

export default MinMaxViewer
