import React, { Component } from "react";
import api from "../../../api/api";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./Movies.css";

class Movies extends Component {
  state = {
    movies: []
  };

  clickHandler = (e, index) => {
    console.log(index);
  };

  async componentDidMount() {
    const { data } = await api({
      url: `http://localhost:5000/api/movies/now-playing`,
      method: "GET"
    });

    this.setState({
      movies: data.movies.slice()
    });
  }

  showMovies = movies => {
    console.log("movies", movies);

    return movies.map((movie, index) => {
      return (
        <div
          style={{ background: "#ECECEC", padding: "30px" }}
          key={movie.tmdb_id}
          className="movie-card"
        >
          <Link to={`/movies/${movie.tmdb_id}`}>
            <Card title={movie.title} bordered={false}>
              <img
                src={movie.poster_urls[0]}
                alt="movie_image"
                onClick={e => this.clickHandler(e, index)}
              />
              <p>{movie.overview}</p>
              <p>{movie.release_date}</p>
              <p>{movie._id}</p>
            </Card>
          </Link>
        </div>
      );
    });
  };
  render() {
    const { movies } = this.state;
    return <div>{this.showMovies(movies)}</div>;
  }
}

export default Movies;