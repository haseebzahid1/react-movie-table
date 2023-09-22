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
    const genres = [{name:'All Gernes'}, ...getGenres()]

    this.setState({movies: getMovies(), genres: genres}) //note
    // this.setState({movies: getMovies(), genres: getGenres()}) //note
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre , currentPage: 1})
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre,  movies: allMovies } = this.state;  // not write in state  selectedGenre
    console.log(selectedGenre)
    if (count === 0) return <p>There are no movies in the datbase</p>;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);   // old paginate(allMovies, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
        <div className="col-3">
            <ListGroup 
            items={this.state.genres} 
            // textProperty="name"   // note
            // valueProperty="_id"   //note
            selectedItem={this.state.selectedGenre}  //note 
            onItemsSelect={this.handleGenreSelect} 
            />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>

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
            itemsCount={filtered.length}
            // itemsCount={count}
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
