import React, { Component } from 'react';
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

class Table extends Component {
    render() { 
        const {columns, sortColumn, onSort, data} = this.props;
        return (
            <table className="table">
                <TableHeader 
                    columns={columns} 
                    sortColumn={sortColumn} 
                    onSort={onSort}
                />
                <TableBody columns={columns} data={data}/>
        </table>
         );
    }
}
 
export default Table;