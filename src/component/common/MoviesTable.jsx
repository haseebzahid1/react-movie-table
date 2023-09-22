import React, { Component } from "react";
import Like from "./Like";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Name" },
    { path: "numberInStock", label: "NumberInStock" },
    { path: "dailyRentalRate", label: "DailyRentalRate" },
    { key: "like", content: movie => <Like /> },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)} //_old this.handleDelete
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props; // _old props
    return (
      <table class="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={movies} />
        {/* <thead>
              <tr>
                <th onClick={() => this.raiseSort('title')}>Title</th>
                <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
                <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
                <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead> */}
        {/* <tbody> */}
        {/* {this.state.movies.map((movie) => ( */}
        {/* {movies.map((movie) => (
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
                  onClick={() => onDelete(movie)} //_old this.handleDelete
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    );
  }
}

// const MoviesTable = (props) => {

// };

export default MoviesTable;
