import React,{Component} from "react";
class TableHeader extends Component {
  //  columns: array
  // sortColumn: object
  // onSort: function
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    // this.setState({ sortColumn:{path, order: 'asc' } }) _old
    this.props.onSort(sortColumn); //note
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th  key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
