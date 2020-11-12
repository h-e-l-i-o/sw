
import Card from 'react-bootstrap/Card'
import './App.css'

function ItemCard(props) {
  return (
    <Card style={{ width: '100%' }}>
    <Card.Img variant="top" src={ props.image } />
        <Card.Body>
    <       Card.Title>{ props.item.name ? props.item.name : props.item.title }</Card.Title>
        </Card.Body>
    </Card>
  );
}

export default ItemCard;