import React, { Component } from "react";
import { getMovies } from "../servies/fakeMovieService";
import { getGenres } from "../servies/fakeGenreService";
import Like from "./common/LIke";
import Pagination from "./common/Pagination";
import { paginate } from "../utilis/paginate";
import { ListGroup } from "./common/ListGroup";
class Movies extends Component {
  state = {
    // movies: getMovies(),
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount(){
    this.setState({movies: getMovies(), genres: getGenres()}) //note
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre)
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the datbase</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
        <div className="col-2">
            {/* <ListGroup /> */}
            <ListGroup items={this.state.genres} onItemsSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database</p>

          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.movies.map((movie) => ( */}
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Movies;
