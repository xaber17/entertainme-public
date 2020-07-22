import React from "react";

export default props => {
  let tag = ""
  props.film.tags.map( dataTag => {
    return tag += `#${dataTag} `
  })

  function editFilm(params) {
    console.log("edit ID >", params)
  }

  function deleteFilm(params) {
    console.log("delete ID >", params)
  }

  return (
    <>
      <div className="card">
        <img src={props.film.poster_path} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Title: {props.film.title}</h5>
          <p className="card-text">Overview: {props.film.overview}</p>
          <p className="card-text">Popularity: {props.film.popularity} / 10</p>
          <p className="card-text">Tags: {tag}</p>
              <button className="btn-sm btn-primary ml-3" onClick={()=>editFilm(props.film._id)}>
                Edit
              </button>
              <button className="btn-sm btn-danger ml-3" onClick={()=>deleteFilm(props.film._id)}>
                Delete
              </button>
            {/* <button className="btn-sm btn-success ml-2" onClick={addToFavourite}>Add to Favourite</button> */}
        </div>
      </div>
    </>
  )
}