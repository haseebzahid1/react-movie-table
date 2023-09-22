import React, { Component } from "react";
import { getMovies } from "../servies/fakeMovieService";
import { getGenres } from "../servies/fakeGenreService";
import Pagination from "./common/Pagination";
import { paginate } from "../utilis/paginate";
import { ListGroup } from "./common/ListGroup";
import MoviesTable from "./common/MoviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    // movies: getMovies(),
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: {path: 'title' , order: 'asc'}
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Gernes" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres }); //note
    // this.setState({movies: getMovies(), genres: getGenres()}) //note
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = path => {
    const sortColumn = {...this.state.sortColumn};
    if(sortColumn.path === path)
     sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc'
    }
    // this.setState({ sortColumn:{path, order: 'asc' } }) _old
      this.setState({sortColumn})
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state; // not write in state  selectedGenre and sortColumn
    console.log(selectedGenre);
    if (count === 0) return <p>There are no movies in the datbase</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    
    const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order] )    //note

    const movies = paginate(sorted, currentPage, pageSize); // _old paginate(allMovies, currentPage, pageSize); after {___old paginate(allMovies, currentPage, pageSize)}

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              // textProperty="name"   // note
              // valueProperty="_id"   //note
              selectedItem={this.state.selectedGenre} //note
              onItemsSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in the database</p>

            <MoviesTable 
              movies={movies} 
              onSort={this.handleSort}
              onDelete={this.handleDelete} 
            />

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
