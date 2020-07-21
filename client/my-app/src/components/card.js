import React from "react";

export default props => {

  return (
    <>
      <div className="card">
        <div className="card-header d-flex flex-row bd-highlight">
          <h5>{props.movie.title}</h5>
        </div>
      </div>
    </>
  )
}