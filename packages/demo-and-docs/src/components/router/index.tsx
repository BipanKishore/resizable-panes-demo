import React from 'react'
import {routerComponentSelector} from './util'

interface IRouterProps {
    path: string,
    index?: number
}

export const Router = (props: IRouterProps) => {
  const {path} = props

  const SelectedComponent = routerComponentSelector(path)

  if (SelectedComponent) {
    return (
      <SelectedComponent {...props} />
    )
  } else {
    return (

      <h3 className="cbox">No Component Found</h3>
    )
  }
}
