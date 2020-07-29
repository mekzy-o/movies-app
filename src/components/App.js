import React, { Fragment } from "react";
import Movie from "./Movie";
import EpisodeList from "./EpisodeList";
import axios from "axios";

//BASE APP COMPONENT
class App extends React.Component {
  state = {
    isLoading: false,
    movie: {},
    searchTerm: "",
    episodes: [],
    seasons: {},
    selectedSeason: 1,
  };

  search = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    axios
      .get(
        `https://api.tvmaze.com/singlesearch/shows/?q=${
          this.state.searchTerm
        }&embed=episodes`
      )
      .then((res) => {
        const {
          _embedded,
          name,
          premiered,
          rating,
          image,
          genres,
          summary,
        } = res.data;

        const movie = {
          name,
          premiered,
          rating,
          image,
          genres,
          summary,
        };

        const { episodes } = _embedded;
        const seasonObj = episodes.reduce((acc, value) => {
          acc[value.season] = acc[value.season] || [];
          acc[value.season].push(value);
          return acc;
        }, {});

        this.setState({
          episodes,
          movie,
          isLoading: false,
          seasons: seasonObj,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      selectedSeason: event.target.value,
    });
  };

  render() {
    const { episodes, isLoading, movie, seasons, selectedSeason } = this.state;
    const displayedSeason = seasons[selectedSeason];

    const options = [];
    for (let index = 0; index < Object.entries(seasons).length; index++) {
      const option = <option value={index + 1}> Season {index + 1}</option>;
      options.push(option);
    }

    return (
      <div>
        <h1>Movie Search App</h1>
        <form onSubmit={this.search}>
          <input
            placeholder="Search for a movie"
            onChange={this.handleChange}
          />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
        {isLoading && <p>Loading....</p>}
        {!isLoading && episodes.length === 0 && (
          <p>Enter some search term in the search input</p>
        )}
        {!isLoading && episodes.length > 0 && <Movie movie={movie} />}
        {!isLoading && episodes.length > 0 && (
          <Fragment>
            <h3>Select seasons to see episodes</h3>
            <select
              value={this.state.selectedSeason}
              onChange={this.handleSelectChange}
            >
              {options}
            </select>
          </Fragment>
        )}
        {!isLoading && episodes.length > 0 && (
          <EpisodeList episodes={displayedSeason} />
        )}
      </div>
    );
  }
}

export default App;
