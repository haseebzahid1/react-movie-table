import React, { Component } from "react";
import Like from "../common/Like";
import Table from '../common/Table'
class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre.name" },
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
      <div>
        <Table 
          columns={this.columns} 
          data={movies} 
          sortColumn={sortColumn}
          onSort={onSort}
         />
      </div>
    );
  }
}

// const MoviesTable = (props) => {

// };

export default MoviesTable;
