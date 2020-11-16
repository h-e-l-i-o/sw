import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import _ from 'lodash'
import './App.css'
import ItemCard from './ItemCard'
import female from './female.png'
import male from './male.png'
import movie from './movie.png'
import robot from './robot.png'

// import 'whatwg-fetch'

function Search () {
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
    setList(result.results)
    setCount(result.count)
    result.next ? setNext(result.next) : setNext('')
  }
  const loadMore = async () => {
    const result = await fetchApi(next)
    setList(list.concat(result.results))
    result.next ? setNext(result.next) : setNext('')
  }
  const fetchApi = async (url) => {
    try {
      const resp = await fetch(url)
      const resJson = await resp.json()
      return resJson
    } catch (e) {
      console.log(e)
    }
  }
  const handleInputChange = async e => {
    setInput(e.target.value)
  }
  const handleSort = async e => {
    setList(_.orderBy(list, [e], ['asc']))
  }
  const toggleSearch = async () => {
    setList([])
    setCount(0)
    setNext('')
    type === 'Character' ? setType('Film') : setType('Character')
  }

  const items = list.map((item) => {
    const urlToArray = item.url.split('/')
    let image
    if (type === 'Character') {
      switch (item.gender) {
        case 'male':
          image = male
          break
        case 'female':
          image = female
          break
        default:
          image = robot
      }
    } else {
      image = movie
    }
    const id = urlToArray[urlToArray.length - 2]
    const linkUrl = `/item/${type === 'Character' ? 'people' : 'films'}/${id}`

    return (
      <Col xs={12} md={6} lg={3}>
        <Link to={linkUrl}><ItemCard item={item} image={image} /></Link>
      </Col>
    )
  }
  )

  return (
    <div>
      <Container className='p-3' fluid>

        <h3 className='header'>Star Wars {type} Search
          &nbsp;
          <Button variant='primary' size='sm' onClick={toggleSearch}>
            Switch to {type === 'Character' ? 'Film' : 'Character'} search
          </Button>
        </h3>
        <br />
        <form onSubmit={getResults}>
          <InputGroup className='mb-3 d-flex justify-content-center' size='sm'>
            <center>
              <FormControl
                placeholder={`Search ${type}`}
                aria-label='Username'
                aria-describedby='basic-addon1'
                onChange={handleInputChange}
              />
              <br /><Button type='submit' size='sm' variant='outline-secondary'>Search {type}</Button>
            </center>
          </InputGroup>
        </form>
      </Container>
      <Container>
        <p>Showing {list.length} results of {count}</p>
        <p>
          <DropdownButton
            size='sm'
            title='Sort By'
            id='dropdown-menu-sort'
            onSelect={handleSort}
          >
            <Dropdown.Item eventKey={type === 'Character' ? 'name' : 'title'}>
              {type === 'Character' ? 'Name' : 'Title'}
            </Dropdown.Item>
            <Dropdown.Item eventKey={type === 'Character' ? 'height' : 'episode_id'}>
              {type === 'Character' ? 'Height' : 'Episode Number'}
            </Dropdown.Item>
          </DropdownButton>
        </p>
        <Row>
          {items}
        </Row>

      </Container>
      <Container className='p-3' fluid>
        {next &&
          <Button variant='outline-secondary' size='sm' block onClick={loadMore}>Load More</Button>}
      </Container>
    </div>

  )
}

export default Search
