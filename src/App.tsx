import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Egis Design System App</h1>
      <p className="subtitle">
        React + Vite &mdash; connected to{' '}
        <code>design-system.egis-group.io/mcp</code>
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="info">
        <h2>MCP Configuration</h2>
        <p>
          The Egis Design System MCP server is configured in{' '}
          <code>.cursor/mcp.json</code>. Open this project in Cursor to use the
          design system tools and resources via the MCP protocol.
        </p>
      </div>
    </>
  )
}

export default App
