import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Meme Game</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
