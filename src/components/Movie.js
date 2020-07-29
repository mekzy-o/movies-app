import React from "react";

class Movie extends React.Component {
  componentDidMount() {
    console.log("mounted here", this.props.movieDetails);
  }
  render() {
    const {
      name,
      premiered,
      rating,
      image,
      genres,
      summary,
    } = this.props.movie;

    // if (!Poster || Poster === "N/A") {
    //   return null;
    // }

    return (
      <div className="movie-card-container">
        <div className="image-container">
          <div
            className="bg-image"
            style={{ backgroundImage: `url(${image.original})` }}
          />
        </div>
        <div className="movie-info">
          <h2>Movie Details</h2>
          <div>
            <h1>{name}</h1>
            <small>Released Date: {premiered}</small>
          </div>
          <h4>Rating: {rating.average} / 10</h4>
          <p>
            <span dangerouslySetInnerHTML={{ __html: summary }} />
          </p>
          <div className="tags-container">
            {genres.map((g) => (
              <span>{g}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
