import React from 'react'
import { Card } from 'react-bootstrap'

const MemeCard = ({ meme }) => {
  // Destructure meme details
  const { title, imageUrl, description, points, icon } = meme

  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt={title} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} {icon && <i className={icon}></i>}
        </Card.Text>
        <Card.Text>
          <small className="text-muted">Points: {points}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default MemeCard
