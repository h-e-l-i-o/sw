import { useState } from 'react'
import { Link } from "react-router-dom"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './App.css'
import ItemCard from './ItemCard'

// import 'whatwg-fetch'

function Search() {
  const [input, setInput] = useState('')
  const [type, setType] = useState('Character')
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [next, setNext] = useState('')

  const rootUrl = 'https://swapi.dev/api'
  const charactersUrl = `${rootUrl}/people/?search=${input}`
  const filmsUrl = `${rootUrl}/films/?search=${input}`

  const getResults = async (event) => {
    event.preventDefault()
    const result = type === 'Character' ? await fetchApi(charactersUrl) : await fetchApi(filmsUrl)
    console.log(result)
    console.log(result.results)
    setList(result.results)
    setCount(result.count)
    result.next ? setNext(result.next) : setNext('')
    console.log(list)
  }
  const loadMore = async () => {
    const result = await fetchApi(next)
    console.log(result)
    setList(list.concat(result.results))
    result.next ? setNext(result.next) : setNext('')
  }
  const fetchApi = async (url) => {
    try {
      const resp = await fetch(url)
      const resJson = await resp.json();
      return resJson
    } catch (e) {
      console.log(e)
    }
  }
  const handleInputChange = async e => {
    setInput(e.target.value)
  }
  const toggleSearch = async e => {
    setList([])
    setCount(0)
    setNext('')
    type === 'Character' ? setType('Film') : setType('Character')
  }

  const items = list.map((item) => {
    const urlToArray = item.url.split('/')
    const id = urlToArray[urlToArray.length - 2]
    const linkUrl = `/item/${ type === 'Character' ? 'people' : 'films'}/${id}`

    return (
    <Col xs={12} md={6} lg={3}>
      <Link to={linkUrl}><ItemCard item={item} /></Link>
    </Col>
    )
  }  
  )

  
  return (
    <div>
      <Container className="p-3" fluid>

        <h3 className="header">Star Wars {type} Search 
          &nbsp;
          <Button variant="primary" size="sm" onClick={toggleSearch}>
            Switch to { type === 'Character' ? 'Film' : 'Character'} search
          </Button>
        </h3>
        <br/>
        <form onSubmit={getResults}>
          <InputGroup className="mb-3 d-flex justify-content-center" size="sm">
            <center>
              <FormControl
                placeholder={`Search ${type}`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleInputChange}
              />
              <br/><Button type="submit" size="sm" variant="outline-secondary">Search {type}</Button>
            </center>
          </InputGroup>
        </form>
      </Container>
      <Container>
        <p>Showing {list.length} results of {count}</p>
        <Row>
          {items}
        </Row>
        
      </Container>
      <Container className="p-3" fluid>
        { next && 
        <Button variant="outline-secondary" size="sm" block onClick={loadMore}>Load More</Button>}
      </Container>
    </div>

  );
}

export default Search;
