import React, { Component } from 'react';
import { FaRegHeart  } from "react-icons/fa";
class Like extends Component {
    state = {  } 
    render() { 
        return <div>
            <FaRegHeart  />
        </div>;
    }
}
 
export default Like;


// render() { 
//     let classes = "fa fa-heart";
//     if(!this.props.liked){
//         classes += "-o"
//     }
//     return ( <i className={classes} onClick={this.props.onClick} style={{cursor: "pointer"}}></i> );
// }