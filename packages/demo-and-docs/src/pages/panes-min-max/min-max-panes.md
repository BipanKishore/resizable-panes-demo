[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=StackBlitz)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)



```jsx mdx:preview
import React from 'react';
import {Panes, ResizablePanes} from 'resizable-panes-react'

 <ResizablePanes split='horizontal'>
        <Panes id="pane1" size={350} maxSize={450} minSize={100}>
        ...Your Element...
        </Panes>

        <Panes id="pane2" size={300} maxSize={400} minSize={100}>
        ...Your Element...
        </Panes>
        
        <Panes id="pane3" size={200} maxSize={500} minSize={150}>
        ...Your Element...
        </Panes>
</ResizablePanes>
```