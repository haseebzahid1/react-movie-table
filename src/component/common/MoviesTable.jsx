import React from 'react'
import Like from './Like';


const MoviesTable = (props) => {
    const {movies, onDelete, onSort} = props
    return (
        <table class="table">
            <thead>
              <tr>
                <th onClick={() => onSort('title')}>Title</th>
                <th onClick={() => onSort('genre.name')}>Genre</th>
                <th onClick={() => onSort('numberInStock')}>Stock</th>
                <th onClick={() => onSort('dailyRentalRate')}>Rate</th>
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
                    <Like/>
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(movie)}  //_old this.handleDelete  
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    );
};

export default MoviesTable;