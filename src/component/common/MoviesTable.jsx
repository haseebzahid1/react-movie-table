import React, { Component } from "react";
import Like from "./Like";

import Table from "./Table";

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
    const { columns ,movies, onSort, sortColumn } = this.props
    return (
      <Table columns={columns} data={movies} onSort={onSort} sortColumn={sortColumn}/>
    )
  }
}


export default MoviesTable;
