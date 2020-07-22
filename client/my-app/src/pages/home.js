import React, { useState } from "react"
import { gql, useQuery } from "@apollo/client"
import Card from "../components/card"

const GET_MOVIES = gql`
query Movies{
  Movies{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`
const GET_TVSERIES = gql`
query TV{
  TvSeries{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export default () => {
  const{ loadingMovie, errorMovie, data: Movies} = useQuery(GET_MOVIES)
  const{ loadingTvSeries, errorTvSeries, data: TvSeries} = useQuery(GET_TVSERIES)
  const [movieInput, setMovieInput] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0,
    tags: []
  })

  if (loadingMovie) {
    return <p>Loading....</p>
  }

  if (errorMovie) {
    return <p>Error....</p>
  }

  return (
    <div className="align-middle text-center">
      <h3>Home</h3>
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-around">
        <div className="p-2 bd-highlight">
          <h5>Movies</h5>
          {/* {JSON.stringify(Movies)} */}
          {Movies && Movies.Movies.map((film, idx) => {
            return <Card key={idx} film={film} />
          })}
        </div>
        <div className="p-2 bd-highlight">
          <h5>TV Series</h5>
          {TvSeries && TvSeries.TvSeries.map((film, idx) => {
            return <Card key={idx} film={film} />
          })}
        </div>
      </div>
    </div>
  )
}