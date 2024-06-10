import React from 'react'
import { Routes, Route, useRoutes } from 'react-router-dom'
import routeList from './Routes/Routes'
function App() {
  const element = useRoutes(routeList)
  return element
}

export default App
