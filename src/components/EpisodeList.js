import React from "react";
import EpisodeCard from "./EpisodeCard";

class EpisodeList extends React.Component {
  render() {
    const { episodes } = this.props;
    return episodes.map((movie) => (
      <EpisodeCard movie={movie} key={movie.id} />
    ));
  }
}

export default EpisodeList;
