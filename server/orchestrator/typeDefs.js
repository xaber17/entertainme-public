const { gql } = require("apollo-server");

const typeDefs = gql`
type Movies {
  id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type TvSeries {
  id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type Response {
  success: Boolean,
  message: String,
}

type Query {
  Movies: [Movies]
  TvSeries: [TvSeries]
  Movie(id: ID): Movies
  TvSerie(id: ID): TvSeries
}

type Mutation {
  addMovie(title: String, overview: String, poster_path: String, popularity: Int, tags: String): Movies
  editMovie(id: ID, title: String, overview: String, poster_path: String, popularity: Int, tags: String): Movies
  deleteMovie(id: ID): Response
  addTvSeries(title: String, overview: String, poster_path: String, popularity: Int, tags: String): TvSeries
  editTvSeries(id: ID, title: String, overview: String, poster_path: String, popularity: Int, tags: String): TvSeries
  deleteTvSeries(id: ID): Response
}
`

export default typeDefs