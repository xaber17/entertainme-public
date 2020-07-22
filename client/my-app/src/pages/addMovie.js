import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const ADD_NEW_MOVIE = gql`
  mutation AddNewMovie($InputMovie: InputMovie) {
    addMovie(newMovie: $InputMovie) {
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;

export default () => {
  const history = useHistory();
  const [add, { data }] = useMutation(ADD_NEW_MOVIE);
  const [title, setTitle] = useState("");
  const [posterPath, setPoster] = useState("");
  const [overview, setOverview] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");

  const addNewMovie = (e) => {
    e.preventDefault();
      add({
        variables: {
          InputMovie: {
            title: title,
            poster_path: posterPath,
            overview: overview,
            popularity: Number(popularity),
            tags: tags,
          },
        },
      });
      setTimeout(() => {
        Swal.fire("Successfully Add New Movie");
        history.push("/");
      }, 1000);
  };

  return (
    <div style={{ width: "70%", margin: "auto" }} className="mt-3">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input type="text" class="form-control" value={title} 
            onChange={(e) => {
              setTitle(e.target.value);
            }}/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Link Poster</label>
          <input type="text" class="form-control" value={posterPath}
            onChange={(e) => {
              setPoster(e.target.value);
            }}/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Overview</label>
          <input type="text" class="form-control" value={overview}
            onChange={(e) => {
              setOverview(e.target.value);
            }}/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Popularity</label>
          <input type="number" class="form-control" min={0} max={10} value={popularity}
            onChange={(e) => {
              setPopularity(e.target.value);
            }}/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Tags</label>
          <textarea class="form-control" rows="3" value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}></textarea>
        </div>
      </form>
      <button className="btn btn-primary" type="submit"
          onClick={(e) => {
            addNewMovie(e);
          }}
        >
          Submit
        </button>
    </div>
  );
};