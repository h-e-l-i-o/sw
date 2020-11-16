import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import './App.css'

function ItemCard (props) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Img variant='top' src={props.image} />
      <Card.Body>
        <Card.Title>{props.item.name ? props.item.name : props.item.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

ItemCard.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  item: PropTypes.object,
  image: PropTypes.node
}

export default ItemCard
