import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
import MemeList from './components/MemeList'

function App() {
  // Initialize the state with a static list of meme items
  const [memes, setMemes] = useState([
    {
      id: 1,
      title: "Meme 1",
      imageUrl: "http://example.com/meme1.jpg",
      description: "A funny meme about everyday life",
      points: 3,
      icon: "bi bi-emoji-smile"
    },
    {
      id: 2,
      title: "Meme 2",
      imageUrl: "http://example.com/meme2.jpg",
      description: "A witty observation on modern life",
      points: 2,
      icon: "bi bi-lightbulb"
    },
    {
      id: 3,
      title: "Meme 3",
      imageUrl: "http://example.com/meme3.jpg",
      description: "A hilarious twist on a classic joke",
      points: 1,
      icon: "bi bi-emoji-laughing"
    },
    {
      id: 4,
      title: "Meme 4",
      imageUrl: "http://example.com/meme4.jpg",
      description: "An epic meme that everyone loves",
      points: 3,
      icon: "bi bi-heart-fill"
    },
    {
      id: 5,
      title: "Meme 5",
      imageUrl: "http://example.com/meme5.jpg",
      description: "A quirky take on everyday events",
      points: 2,
      icon: "bi bi-chat-left-text"
    }
  ])

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <MemeList memes={memes} />
      </Container>
    </>
  )
}

export default App
