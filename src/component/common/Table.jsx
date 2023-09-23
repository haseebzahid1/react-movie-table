import React from 'react';
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";
const Table = props => {
    const { columns , onSort, sortColumn,data } = props; // _old props
        return (
          <table class="table">
            <TableHeader
              columns={columns}
              sortColumn={sortColumn} 
              onSort={onSort}
            />
            
            { <TableBody columns={columns} data={data} /> }    {/*data={movies} replacing data={data}*/}
            
          </table>
        );
   
}

export default Table