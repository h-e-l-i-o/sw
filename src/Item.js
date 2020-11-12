import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import female from './female.png'
import male from './male.png'
import movie from './movie.png'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import './App.css'

function Item() {
  const [item, setItem] = useState({})
  let { type, id } = useParams()
  const rootUrl = 'https://swapi.dev/api'
  const fullUrl = `${rootUrl}/${type}/${id}`

  useEffect(() => {
    const getResult = async () => {
      const result = await fetchApi(fullUrl)
      console.log(result)
      setItem(result)
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

    getResult();
  }, []);

  return (
    <Jumbotron>
  <h1>{ item.name ? item.name : item.title }</h1>
  <p><Image src={ item.gender ? (item.gender === 'male' ? male : female) : movie} rounded /></p>
  <p>
  { item.name ? `Height: ${item.height}` : item.opening_crawl }
  </p>

</Jumbotron>
  )
}

export default Item;