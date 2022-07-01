import React from "react";

function Item({ item, onUpdateItem, onDeletedItems }) {
  function handleDelete() {
    console.log(item);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => onDeletedItems(item));
  }

  function handleClick(e) {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then(r => r.json())
      .then(updatedItem => onUpdateItem(updatedItem));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={handleClick}
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">
        Delete
      </button>
    </li>
  );
}

export default Item;
