
```jsx mdx:preview

interface ICustomResizerProp {
    onMouseDown:any,
    isMouseDown: boolean,
    onTouchStartCapture: any
  }


export const CustomResizer = ({
    onMouseDown,
    isMouseDown, 
    onTouchStartCapture
}: ICustomResizerProp) => {

 // isMouseDown: use it to style the elements

  return (
    <SOME_ELEMENT>
      <TARGET_ELEMENT
        onMouseDown={onMouseDown}
        onTouchStartCapture={onTouchStartCapture}
      >
      </TARGET_ELEMENT>
    </SOME_ELEMENT>
  )
}

```
