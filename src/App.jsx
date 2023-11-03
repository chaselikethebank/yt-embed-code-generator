import { useState, useEffect } from 'react'
import YoutubeEmbedCodeGenerator from './assets/YouTubeEmbedCodeGenerator'
import YTlogo from '../src/logo/yt-logo.jpeg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
  {/* <img src={YTlogo} style={{ width: '570px' }} /> */}
  <div style={{ width: '570px'}}>
    <YoutubeEmbedCodeGenerator />
    </div>
    </>
  )
}

export default App
