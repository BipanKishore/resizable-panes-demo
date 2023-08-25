
import './App.css';
import  {ResizablePanes, Panes} from 'react-resizable-panes'

function App() {
  return (
    <div className="App">
      <ResizablePanes resizerSize={5} >
      <Panes id='pane1' className="pane1" >
        Pane 1
      </Panes>
      
      <Panes id='pane2' className="pane2">
        Pane 11
      </Panes>
      
      <Panes id='pane3'  className="pane3">
        Pane 111
      </Panes>
      
      <Panes id="pane4"   className="pane2">
        Pane 1111
      </Panes>
      
      </ResizablePanes>
    </div>
  );
}

export default App;
