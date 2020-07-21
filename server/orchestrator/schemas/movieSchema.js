const { gql } = require("apollo-server");
const Axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3001/movie";

const typeDefs = gql`
  input InputMovie {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  type Movies {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  extend type Query {
    Movies: [Movies]
    Movie(_id: ID): Movies
  }

  extend type Mutation {
    addMovie(newMovie: InputMovie): Movies
    updateMovie(updatedMovie: InputMovie): Movies
    deleteMovie(_id: ID): Movies
  }
`

const resolvers = {
  Query: {
    Movies: async () => {
      try {
        const movies = await redis.get("Movies");
        if (movies) {
          return JSON.parse(movies);
        } else {
          const getMovies = await Axios.get(url);
          await redis.set("Movies", JSON.stringify(getMovies.data));
          return getMovies.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    Movie: async (_, args) => {
      try {
        const getMovie = await Axios.get(`${url}/${args._id}`)
        console.log(getMovie.data)
        return getMovie.data
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const addNewMovie = await Axios.post(`${url}/add`, args.newMovie);
        await redis.del("Movies");
        return JSON.parse(addNewMovie.config.data);
      } catch (err) {
        console.log(err);
      }
    },
    updateMovie: async (_, args) => {
      try {
        const updateMovie = await Axios.put(
          `${url}/${args.updatedMovie._id}`,
          args.updatedMovie
        );
        await redis.del("Movies");
        return JSON.parse(updateMovie.config.data);
      } catch (err) {
        console.log(err);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        await Axios.delete(`${url}/${args._id}`);
        await redis.del("Movies");
        return `Deleted with ID ${args._id}`;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};