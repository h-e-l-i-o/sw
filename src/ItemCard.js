import female from './female.png'
import male from './male.png'
import movie from './movie.png'
import Card from 'react-bootstrap/Card'
import './App.css'

function ItemCard(props) {
  return (
    <Card style={{ width: '100%' }}>
    <Card.Img variant="top" src={ props.item.gender ? (props.item.gender === 'male' ? male : female) : movie} />
        <Card.Body>
    <       Card.Title>{ props.item.name ? props.item.name : props.item.title }</Card.Title>
        </Card.Body>
    </Card>
  );
}

export default ItemCard;