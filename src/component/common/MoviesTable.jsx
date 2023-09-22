import React,{Component} from 'react'
import Like from './Like';

class MoviesTable extends Component {
  
  raiseSort = path => {
    const sortColumn = {...this.props.sortColumn};

    if(sortColumn.path === path)
    sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
   else {
     sortColumn.path = path;
     sortColumn.order = 'asc'
   }
   // this.setState({ sortColumn:{path, order: 'asc' } }) _old
     this.props.onSort(sortColumn)  //note
  } 

  render() { 
    const {movies, onDelete} = this.props // _old props
    return (
        <table class="table">
            <thead>
              <tr>
                <th onClick={() => this.raiseSort('title')}>Title</th>
                <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
                <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
                <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
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
  }
}
 

// const MoviesTable = (props) => {
   
// };

export default MoviesTable;

