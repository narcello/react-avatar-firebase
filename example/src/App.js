import React from 'react'
import { useMyHook } from 'react-avatar-firebase'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App