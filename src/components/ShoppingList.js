import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleDeletedItems(deletedItem) {
    const deleteItem = items.filter(item => item.id !== deletedItem.id);
    setItems(deleteItem);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  }

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => r.json())
      .then(items => {
        setItems(items);
      });
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter(item => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item
            onDeletedItems={handleDeletedItems}
            onUpdateItem={handleUpdateItem}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
