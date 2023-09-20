[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=StackBlitz)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)



```jsx mdx:preview
import React from 'react';
import {Panes, ResizablePanes} from 'react-resizable-panes'

        <ResizablePanes className='h-300' split='vertical'>
          <Panes
            className={pane1} id={pane1}
            resizer={
              <Your Custom Resizer Node />
            }
            size={350}
          >
           ...Your Element...
          </Panes>

          <Panes
            className={pane2} id={pane2}
            resizer={
              <Your Custom Resizer Node />
            }
            size={300}
          >
           ...Your Element...
          </Panes>

          <Panes className={pane3} id={pane3} size={150}>
           ...Your Element...
          </Panes>

        </ResizablePanes>

```