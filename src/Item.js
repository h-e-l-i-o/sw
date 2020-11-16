import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import female from './female.png'
import male from './male.png'
import movie from './movie.png'
import robot from './robot.png'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom"
import './App.css'

function Item() {
  const [item, setItem] = useState({})
  const [image, setImage] = useState('')
  let { type, id } = useParams()
  const rootUrl = 'https://swapi.dev/api'
  const fullUrl = `${rootUrl}/${type}/${id}`

  useEffect(() => {
    const getResult = async () => {
      const result = await fetchApi(fullUrl)
      if (result.name) {
        switch(result.gender) {
          case 'male':
            setImage(male)
            break
          case 'female':
            setImage(female)
            break
          default:
            setImage(robot)
        }
      } else {
        setImage(movie)
      }

      setItem(result)
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

    getResult()
  }, [fullUrl])

  return (
    <Jumbotron>
      <p><Link to='/'>Go to Search</Link></p>
      <h1>{ type === 'people' ? item.name : item.title }</h1>
      <p>
        <Image
        src={image} rounded />
      </p>
      <p>
      { item.name ? `Height: ${item.height}` : item.opening_crawl }
      </p>

</Jumbotron>
  )
}

export default Item