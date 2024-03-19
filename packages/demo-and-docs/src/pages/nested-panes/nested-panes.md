[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-StackBiltz-blue?logo=StackBlitz)](https://stackblitz.com/edit/stackblitz-starters-4cxwmb?file=src%2FApp.tsx)

```jsx mdx:preview
import React from 'react';
import {Pane, ResizablePanes} from 'resizable-panes-react'

      <ResizablePanes uniqueId='main-container' vertical>
        <Pane className={pane1} id={pane1} minSize={100} size={200}>
          <ResizablePanes uniqueId='child-1'>
            <Pane className={pane1} id={pane1} size={150}>
              ...Your Element...
            </Pane>
            </Pane>
            <Pane className={pane3} id={pane3} size={150}>
              ...Your Element...
            </Pane>
         </Pane>
          </ResizablePanes>
        </Pane>

        <Pane className={pane2} id={pane2} minSize={100} size={400}>
        ...Your Element...
        </Pane>

        <Pane className={pane3} id={pane3} minSize={100} size={200}>
          <ResizablePanes uniqueId='child-2'>
            <Pane className={pane1} id={pane1} size={150}>
              ...Your Element...
            </Pane>
            </Pane>
            <Pane className={pane3} id={pane3} size={150}>
              ...Your Element...
            </Pane>
          </ResizablePanes>
        </Pane>
      </ResizablePanes>
```
