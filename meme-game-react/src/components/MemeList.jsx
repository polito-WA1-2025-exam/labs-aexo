import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import MemeCard from './MemeCard'

const MemeList = ({ memes }) => {
  return (
    <Container>
      <Row>
        {memes.map((meme) => (
          <Col key={meme.id} md={4} className="mb-4">
            <MemeCard meme={meme} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MemeList
