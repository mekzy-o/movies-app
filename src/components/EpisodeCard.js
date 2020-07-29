import React from "react";

class EpisodeCard extends React.Component {
  render() {
    const { name, airdate, image, summary } = this.props.movie;

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
            <small>Released Date: {airdate}</small>
            <span dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
          <div className="tags-container" />
        </div>
      </div>
    );
  }
}

export default EpisodeCard;
