// require('dotenv').config();
// const express = require('express');
// const app = express ();
// const PORT = process.env.PORT || 3000;
// const router = require('./routes/index');

// app.use(express.urlencoded({extended:true}));
// app.use("/", router);

// app.listen(PORT, ()=>{
//   console.log(`Server running on port ${PORT}`);
// })

const { ApolloServer, gql } = require("apollo-server");
const Axios = require('axios')
const movieUrl = "http://localhost:3001/movie"
const tvUrl = "http://localhost:3002/tv"

const typeDefs = gql`
    type Movies {
        id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: String
    }

    type TvSeries {
        id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: String
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

const resolvers = {
    Query : {
        Movies : () => {
            return Axios({
                method: "get",
                url: movieUrl
            })
                .then(({data}) => {
                    data.map(dt => {
                        dt.id = dt['_id']
                    })
                    return data
                })
                .catch(err => {
                  console.log(err)
                })
        },
        Movie : (_, args) => {
            const id = args.id
            return Axios({
                method: "get",
                url: movieUrl + `/${id}`
            })
                .then(({data}) => {
                    data.id = data['_id']
                    return data
                })
                .catch(err => {
                  console.log(err)
                })
        },
        TvSeries : () => {
            return Axios({
                method: "get",
                url: tvUrl
            })
                .then(({data}) => {
                    data.map(dt => {
                        dt.id = dt['_id']
                    })
                    return data
                })
                .catch(err => {
                  console.log(err)
                })
        },
        TvSerie : (_, args) => {
            const id = args.id
            return Axios({
                method: "get",
                url: tvUrl + `/${id}`
            })
                .then(({data}) => {
                    data.id = data['_id']
                    return data
                })
                .catch(err => {
                  console.log(err)
                })
        }
    },
    Mutation : {
        addMovie: (_, args) => {
            const {title, overview, poster_path, popularity, tags} = args
            console.log(args)

            return Axios({
                method: "post",
                url: movieUrl,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
                .then(({data}) => {
                    data.ops[0].id = data.ops[0]['_id']
                    return data.ops[0]
                })
                .catch(err => {
                  console.log(err)
                })
        },
        editMovie: (_, args) => {
            const {id, title, overview, poster_path, popularity, tags} = args
            console.log(args.id)
            return Axios({
                method: "PUT",
                url: movieUrl + `/${id}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
                .then(({data}) => {
                  data.value.id = data.value['_id']
                  return data.value
                })
                .catch(err => {
                  console.log(err)
                })
        },
        deleteMovie: (_, args) => {
            const {id} = args
            console.log(id)
            return Axios({
                method: "delete",
                url: movieUrl + `/${id}`,
            })
                .then(({data}) => {
                    return {
                        success : true,
                        message: "Deleted success"
                    }
                })
                .catch(err => {
                  console.log(err)
                })
        },
        addTvSeries: (_, args) => {
            const {title, overview, poster_path, popularity, tags} = args

            return Axios({
                method: "post",
                url: tvUrl,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
                .then(({data}) => {
                    data.ops[0].id = data.ops[0]['_id']
                    return data.ops[0]
                })
                .catch(console.log)
        },
        editTvSeries: (_, args) => {
            const {id, title, overview, poster_path, popularity, tags} = args.TvSeries

            return Axios({
                method: "put",
                url: tvUrl + `/${id}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
                .then(({data}) => {
                  data.value.id = data.value['_id']
                  return data.value
                })
                .catch(err => {
                  console.log(err)
                })
        },
        deleteTvSeries: (_, args) => {
            const id = args

            return Axios({
                method: "delete",
                url: tvUrl + `/${id}`,
            })
                .then(({data}) => {
                    return {
                        success : true,
                        message: "Deleted success"
                    }
                })
                .catch(err => {
                  console.log(err)
                })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url}) => {
    console.log(`Server running at ${url}`)
})