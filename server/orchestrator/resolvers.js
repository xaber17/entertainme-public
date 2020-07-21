const resolvers = {
  Query: {
    Movies: () => {
      return Axios({
        method: "get",
        url: movieUrl
      })
        .then(({ data }) => {
          data.map(obj => {
            obj.id = obj['_id']
          })
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    Movie: (_, args) => {
      const id = args.id
      return Axios({
        method: "get",
        url: movieUrl + `/${id}`
      })
        .then(({ data }) => {
          data.id = data['_id']
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    TvSeries: () => {
      return Axios({
        method: "get",
        url: tvUrl
      })
        .then(({ data }) => {
          data.map(obj => {
            obj.id = obj['_id']
          })
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    TvSerie: (_, args) => {
      const id = args.id
      return Axios({
        method: "get",
        url: tvUrl + `/${id}`
      })
        .then(({ data }) => {
          data.id = data['_id']
          return data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args
      console.log(args)

      return Axios({
        method: "post",
        url: movieUrl,
        data: {
          title, overview, poster_path, popularity, tags
        }
      })
        .then(({ data }) => {
          data.ops[0].id = data.ops[0]['_id']
          return data.ops[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    editMovie: (_, args) => {
      const { id, title, overview, poster_path, popularity, tags } = args
      console.log(args.id)
      return Axios({
        method: "PUT",
        url: movieUrl + `/${id}`,
        data: {
          title, overview, poster_path, popularity, tags
        }
      })
        .then(({ data }) => {
          data.value.id = data.value['_id']
          return data.value
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteMovie: (_, args) => {
      const { id } = args
      console.log(id)
      return Axios({
        method: "delete",
        url: movieUrl + `/${id}`,
      })
        .then(({ data }) => {
          return {
            success: true,
            message: "Deleted success"
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTvSeries: (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args

      return Axios({
        method: "post",
        url: tvUrl,
        data: {
          title, overview, poster_path, popularity, tags
        }
      })
        .then(({ data }) => {
          data.ops[0].id = data.ops[0]['_id']
          return data.ops[0]
        })
        .catch(console.log)
    },
    editTvSeries: (_, args) => {
      const { id, title, overview, poster_path, popularity, tags } = args.TvSeries

      return Axios({
        method: "put",
        url: tvUrl + `/${id}`,
        data: {
          title, overview, poster_path, popularity, tags
        }
      })
        .then(({ data }) => {
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
        .then(({ data }) => {
          return {
            success: true,
            message: "Deleted success"
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

export default resolvers