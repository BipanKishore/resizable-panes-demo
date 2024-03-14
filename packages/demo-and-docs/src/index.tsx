import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import '@uiw/react-markdown-preview/markdown.css'

import '../style/style.scss'
import '../style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

root.render(<App />)
