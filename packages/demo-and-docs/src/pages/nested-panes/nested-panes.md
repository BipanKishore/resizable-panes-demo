[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=StackBlitz)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)



```jsx mdx:preview
import React from 'react';
import {Panes, ResizablePanes} from 'resizable-panes-react'

      <ResizablePanes vertical>
        <Panes className={pane1} id={pane1} minSize={100} size={200}>
          <ResizablePanes>
            <Panes className={pane1} id={pane1} size={150}>
              ...Your Element...
            </Panes>
            </Panes>
            <Panes className={pane3} id={pane3} size={150}>
              ...Your Element...
            </Panes>
         </Panes>
          </ResizablePanes>
        </Panes>

        <Panes className={pane2} id={pane2} minSize={100} size={400}>
        ...Your Element...
        </Panes>

        <Panes className={pane3} id={pane3} minSize={100} size={200}>
          <ResizablePanes>
            <Panes className={pane1} id={pane1} size={150}>
              ...Your Element...
            </Panes>
            </Panes>
            <Panes className={pane3} id={pane3} size={150}>
              ...Your Element...
            </Panes>
          </ResizablePanes>
        </Panes>
      </ResizablePanes>
```