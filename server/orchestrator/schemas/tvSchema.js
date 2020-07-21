const { gql } = require("apollo-server");
const Axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3002/tv";

const typeDefs = gql`
  input InputTv {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  extend type Query {
    TvSeries: [TvSeries]
    Tv(_id: ID): TvSeries
  }

  extend type Mutation {
    addTv(newTv: InputTv): TvSeries
    updateTv(updatedTv: InputTv): TvSeries
    deleteTv(_id: ID): TvSeries
  }
`

const resolvers = {
  Query: {
    TvSeries: async () => {
      try {
        const tvSeries = await redis.get("tvSeries");
        if (tvSeries) {
          return JSON.parse(tvSeries);
        } else {
          const gettvSeries = await Axios.get(url);
          await redis.set("tvSeries", JSON.stringify(gettvSeries.data));
          return gettvSeries.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    Tv: async (_, args) => {
      try {
        const getTv = await Axios.get(`${url}/${args._id}`)
        console.log(getTv.data)
        return getTv.data
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addTv: async (_, args) => {
      try {
        const addNewTv = await Axios.post(`${url}/add`, args.newTv);
        await redis.del("tvSeries");
        return JSON.parse(addNewTv.config.data);
      } catch (err) {
        console.log(err);
      }
    },
    updateTv: async (_, args) => {
      try {
        const updateTv = await Axios.put(
          `${url}/${args.updatedTv._id}`,
          args.updatedTv
        );
        await redis.del("tvSeries");
        return JSON.parse(updateTv.config.data);
      } catch (err) {
        console.log(err);
      }
    },
    deleteTv: async (_, args) => {
      try {
        await Axios.delete(`${url}/${args._id}`);
        await redis.del("tvSeries");
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