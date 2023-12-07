import React, { useState } from "react";
import Item from "./Item";
import "./ShoppingList.css";

interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingList: React.FC = () => {
  const [listName, setListName] = useState<string>("Weekend List");
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: "Banana", price: 3.5, quantity: 0.5 },
    { id: 2, name: "Apple", price: 4.0, quantity: 1 },
    { id: 3, name: "Strawberry", price: 6.0, quantity: 1.5 },
  ]);
  const [newItem, setNewItem] = useState<{
    name: string;
    price: string;
    quantity: string;
  }>({
    name: "",
    price: "",
    quantity: "",
  });

  const incrementQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 0.5 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 0.5) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: value }));
  };

  const addItem = () => {
    setItems((prevItems) => {
      const { name, price, quantity } = newItem;
      if (name && price && quantity) {
        const id = prevItems.length + 1;
        return [
          ...prevItems,
          {
            id,
            name,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
          },
        ];
      }
      return prevItems;
    });
    setNewItem({ name: "", price: "", quantity: "" });
  };

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-list">
      <header>
        <input
          type="text"
          value={listName}
          onChange={handleListNameChange}
          className="list-name-input"
        />
      </header>

      <div className="add-item-form">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="items">
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
      <footer>
        <div className="total">Total: ${total.toFixed(2)}</div>
        <a href="/cart" className="checkout-link">
          <button className="checkout">Checkout</button>
        </a>
      </footer>
    </div>
  );
};

export default ShoppingList;
