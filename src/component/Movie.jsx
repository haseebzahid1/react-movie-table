import React, { Component } from "react";
import { getMovies } from "../servies/fakeMovieService";
import { getGenres } from "../servies/fakeGenreService";
import Pagination from "./common/Pagination";
import { paginate } from "../utilis/paginate";
import { ListGroup } from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/search";

class Movies extends Component {
  state = {
    // movies: getMovies(),
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state; // not write in state  selectedGenre and sortColumn


    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); //note

    const movies = paginate(sorted, currentPage, pageSize); // _old paginate(allMovies, currentPage, pageSize); after {___old paginate(allMovies, currentPage, pageSize)}
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      genres,
      selectedGenre,
    } = this.state;
    if (count === 0) return <h4> There are no movies in database</h4>;
    const { totalCount, data } = this.getPageData();
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              // textProperty="name"   // note
              // valueProperty="_id"   //note
              selectedItem={selectedGenre} //note
              onItemsSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
            />

            <Pagination
              itemsCount={totalCount}
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
