export const VERTICAL_PANE_MARKDOWN_JSX = `\`\`\`jsx mdx:preview
import React from 'react';
import {Panes, ResizablePanes} from 'react-resizable-panes'

 <ResizablePanes className='h-300' split='vertical'>
        <Panes className={pane1} id={pane1} key={pane1} size={350}>
        </Panes>

        <Panes className={pane2} id={pane2} key={pane2} size={300}>
        </Panes>
        
        <Panes className={pane3} id={pane3} key={pane3} size={200}>
        </Panes>
</ResizablePanes>
\`\`\``
