import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './App.css'

import 'whatwg-fetch'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const apiUrl = `https://swapi.dev/api/people/?search=${input}`

  const getResults = async (event) => {
    event.preventDefault()
    const result = await fetchApi(apiUrl)
    console.log(result.results)
    setList(result.results)
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

  const items = list.map((item) =>
  <li>{item.name}</li>
  )

  
  return (
    <div>
      <Container className="p-3" fluid>

        <h3 className="header">Star Wars Character Search</h3>
        <form onSubmit={getResults}>
          <InputGroup className="mb-3 d-flex justify-content-center" size="sm">
            <center>
              <FormControl
                placeholder="Search Character"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleInputChange}
              />
              <br/><Button type="submit" size="sm" variant="outline-secondary">Search Character</Button>
            </center>
          </InputGroup>
        </form>
      </Container>
      <Container>
        <ul>{items}</ul>
      </Container>
      <Container className="p-3" fluid>
        <Button variant="outline-secondary" size="sm" block>
          Load More
        </Button>
      </Container>
    </div>

  );
}

export default App;
