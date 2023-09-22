import React from "react";

export const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemsSelect, selectedItem } = props; // note
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li 
           onClick={()=> onItemsSelect(item)}
           key={item[valueProperty]} 
           className={item === selectedItem ? "list-group-item active" : "list-group-item"}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name", // note
  valueProperty: "_id",
};

//  default ListGroup
