[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-StackBiltz-blue?logo=StackBlitz)](https://stackblitz.com/edit/stackblitz-starters-hbcgyd?file=src%2FApp.tsx)



```jsx mdx:preview
import React from 'react';
import {Panes, ResizablePanes} from 'resizable-panes-react'

 <ResizablePanes>
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