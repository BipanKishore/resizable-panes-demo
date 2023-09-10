import React, {
  Component
} from 'react'
import {getSizeStyle} from '../utils/new-util'
import {IPane} from '../@types/component-types'
import {Svg} from './svg'
import {PaneIcons} from './pane-icons'

export default class Pane extends Component<IPane> {
  // constructor (props: IPane) {
  //   super(props)
  // }

  componentDidMount (): void {
    console.log('v-------- Pane componentDidMount')
  }

  shouldComponentUpdate (nextProps: Readonly<IPane>, nextState: Readonly<{}>, nextContext: any): boolean {
    const {split, className, children} = this.props
    return split !== nextProps.split || className !== nextProps.className || nextProps.children !== children
  }

  render (): React.ReactNode {
    console.log('v-------- Pane render')
    const {
      className,
      children,
      size,
      split,
      id,
      toFullSize,
      closeFullSize,
      toFullPage
    } = this.props
    const style = getSizeStyle(split, size)
    return (
      <div
        className={className}
        ref={this.props.innerRef}
        style={style}
      >
        <PaneIcons
          closeFullSize={closeFullSize}
          id={id}
          toFullPage={toFullPage}
          toFullSize={toFullSize}
        />
        {children}
      </div>
    )
  }
}
